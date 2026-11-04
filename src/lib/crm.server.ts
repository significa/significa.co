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
};

export const signPayload = (payload: string, secret: string): string =>
  createHmac('sha256', secret).update(payload, 'utf8').digest('hex');

/** 429 and 5xx can succeed later. Any other 4xx means the request itself is wrong. */
const isRetryable = (status: number) => status === 429 || status >= 500;

const fileName = (url: string, index: number) => {
  const last = new URL(url).pathname.split('/').pop();
  return last ? decodeURIComponent(last) : `attachment-${index + 1}`;
};

/** Downloads attachments until the size limit. Returns the files and the URLs left over. */
const downloadAttachments = async (urls: string[], fetchFn: typeof fetch) => {
  const files: File[] = [];
  const leftOver: string[] = [];
  let total = 0;

  for (const [index, url] of urls.entries()) {
    try {
      const response = await fetchFn(url, { signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS) });
      if (!response.ok) throw new Error(`status ${response.status}`);
      const blob = await response.blob();
      if (total + blob.size > MAX_ATTACHMENT_BYTES) {
        leftOver.push(url);
        continue;
      }
      total += blob.size;
      files.push(
        new File([blob], fileName(url, index), {
          type: blob.type || response.headers.get('content-type') || 'application/octet-stream'
        })
      );
    } catch {
      leftOver.push(url);
    }
  }

  return { files, leftOver };
};

export const postToCrm = async (
  submission: CrmSubmission,
  config: CrmConfig,
  idempotencyKey: string,
  { fetch: fetchFn = fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)) }: Deps = {}
): Promise<CrmResult> => {
  const { files, leftOver } = await downloadAttachments(submission.attachmentUrls, fetchFn);

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

  let lastError = 'unknown error';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetchFn(config.url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS)
      });

      if (response.status === 202 || response.ok) {
        const body = (await response.json().catch(() => ({}))) as { submissionId?: string };
        return { ok: true, submissionId: body.submissionId ?? null };
      }

      lastError = `CRM answered ${response.status}`;
      if (!isRetryable(response.status)) break;
    } catch (error) {
      lastError = error instanceof Error ? error.name : 'network error';
    }

    if (attempt < MAX_ATTEMPTS) await sleep(RETRY_DELAYS_MS[attempt - 1] ?? 1500);
  }

  return { ok: false, error: lastError };
};
