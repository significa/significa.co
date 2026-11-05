import { createHmac } from 'node:crypto';

// Posts a get-a-quote submission to the Significa CRM (POST /api/intake/form).
// The JSON fields are signed with HMAC-SHA256 (hex) in X-Signature. The same Idempotency-Key is
// sent on every attempt, so a retry never creates a second lead. Attachments already live in S3:
// they are downloaded and sent as files in a multipart body, with the JSON in a part named
// `payload`. Any file that can't be attached (too big, failed download) is sent as a URL instead.
// Form contents are never logged.

/** The CRM accepts up to 25 MB of files per submission. */
const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024;
const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 15_000;
const RETRY_DELAYS_MS = [500, 1500];
/** Downloads and every attempt share this budget, leaving the route (maxDuration 60s) time for Notion and email. */
const TOTAL_DEADLINE_MS = 40_000;

export type CrmSubmission = {
  name: string;
  email: string;
  message: string;
  budget?: string;
  attachmentUrls: string[];
};

export type CrmConfig = {
  url: string;
  secret: string;
};

export type CrmResult = { ok: true; submissionId: string | null } | { ok: false; error: string };

type Deps = {
  fetch?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  deadline?: AbortSignal;
};

export const signPayload = (payload: string, secret: string): string =>
  createHmac('sha256', secret).update(payload, 'utf8').digest('hex');

/** 429 and 5xx can succeed later. Any other 4xx means the request itself is wrong. */
const isRetryable = (status: number) => status === 429 || status >= 500;

const fileName = (url: string, index: number) => {
  const last = new URL(url).pathname.split('/').pop();
  return last ? decodeURIComponent(last) : `attachment-${index + 1}`;
};

/**
 * Starts every download at once and reads only the bodies that fit the size limit, judged by
 * Content-Length before anything is buffered. Returns the files and the URLs left over.
 */
const downloadAttachments = async (
  urls: string[],
  fetchFn: typeof fetch,
  deadline: AbortSignal
) => {
  const signal = AbortSignal.any([deadline, AbortSignal.timeout(ATTEMPT_TIMEOUT_MS)]);
  const responses = await Promise.allSettled(urls.map((url) => fetchFn(url, { signal })));
  const leftOver: string[] = [];
  const accepted: { url: string; index: number; response: Response }[] = [];
  let total = 0;

  // Budget by Content-Length first, so nothing is buffered that won't be sent.
  urls.forEach((url, index) => {
    const settled = responses[index];
    const response = settled.status === 'fulfilled' ? settled.value : null;
    const size = Number(response?.headers.get('content-length'));
    // fetch decodes gzip & co, so Content-Length would only count the compressed bytes.
    const encoded = (response?.headers.get('content-encoding') ?? 'identity') !== 'identity';
    if (!response?.ok || encoded || !size || total + size > MAX_ATTACHMENT_BYTES) {
      response?.body?.cancel().catch(() => {});
      leftOver.push(url);
      return;
    }
    total += size;
    accepted.push({ url, index, response });
  });

  const blobs = await Promise.allSettled(accepted.map(({ response }) => response.blob()));
  const files: File[] = [];
  blobs.forEach((blob, i) => {
    const { url, index, response } = accepted[i];
    if (blob.status === 'rejected') return void leftOver.push(url);
    files.push(
      new File([blob.value], fileName(url, index), {
        type: blob.value.type || response.headers.get('content-type') || 'application/octet-stream'
      })
    );
  });

  return { files, leftOver };
};

export const postToCrm = async (
  submission: CrmSubmission,
  config: CrmConfig,
  idempotencyKey: string,
  {
    fetch: fetchFn = fetch,
    sleep = (ms) => new Promise((r) => setTimeout(r, ms)),
    deadline = AbortSignal.timeout(TOTAL_DEADLINE_MS)
  }: Deps = {}
): Promise<CrmResult> => {
  const { files, leftOver } = await downloadAttachments(
    submission.attachmentUrls,
    fetchFn,
    deadline
  );

  const payload = JSON.stringify({
    name: submission.name,
    email: submission.email,
    message: submission.message,
    ...(submission.budget ? { budget: submission.budget } : {}),
    ...(leftOver.length ? { attachmentUrls: leftOver } : {}),
    formType: 'quote',
    submittedAt: new Date().toISOString()
  });

  const headers: Record<string, string> = {
    'X-Signature': signPayload(payload, config.secret),
    'Idempotency-Key': idempotencyKey
  };

  // FormData and Files are re-serialised on every fetch, so one body serves every attempt.
  let body: BodyInit = payload;
  if (files.length) {
    const form = new FormData();
    form.append('payload', payload);
    files.forEach((file, index) => form.append(`file-${index + 1}`, file, file.name));
    body = form;
  } else {
    headers['Content-Type'] = 'application/json';
  }

  let lastError = 'CRM deadline exceeded';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && !deadline.aborted; attempt++) {
    try {
      const response = await fetchFn(config.url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.any([deadline, AbortSignal.timeout(ATTEMPT_TIMEOUT_MS)])
      });

      if (response.ok) {
        const json = (await response.json().catch(() => ({}))) as { submissionId?: string };
        return { ok: true, submissionId: json.submissionId ?? null };
      }

      lastError = `CRM answered ${response.status}`;
      if (!isRetryable(response.status)) break;
    } catch (error) {
      lastError = error instanceof Error ? error.name : 'network error';
    }

    if (attempt < MAX_ATTEMPTS && !deadline.aborted)
      await sleep(RETRY_DELAYS_MS[attempt - 1] ?? 1500);
  }

  return { ok: false, error: lastError };
};
