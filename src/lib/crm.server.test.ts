import { describe, expect, it, vi } from 'vitest';
import { postToCrm, signPayload, type CrmSubmission } from './crm.server';

const config = { url: 'https://crm.test/api/intake/form', secret: 'shh' };
const submission: CrmSubmission = {
  name: 'Ada',
  email: 'ada@example.com',
  message: 'We need a new app',
  budget: '50k-100k',
  attachmentUrls: []
};
const noSleep = () => Promise.resolve();

const accepted = () => Response.json({ submissionId: 'sub_1' }, { status: 202 });

describe('postToCrm', () => {
  it('signs the JSON body and sends the idempotency key', async () => {
    const fetch = vi.fn().mockResolvedValue(accepted());

    const result = await postToCrm(submission, config, 'key-1', { fetch, sleep: noSleep });

    expect(result).toEqual({ ok: true, submissionId: 'sub_1' });
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe(config.url);
    expect(init.headers['Idempotency-Key']).toBe('key-1');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(init.headers['X-Signature']).toBe(signPayload(init.body, 'shh'));
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Ada',
      email: 'ada@example.com',
      budget: '50k-100k',
      formType: 'quote'
    });
  });

  it('retries 5xx and network errors with the same key, then succeeds', async () => {
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(accepted());

    const result = await postToCrm(submission, config, 'key-2', { fetch, sleep: noSleep });

    expect(result.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(3);
    const keys = fetch.mock.calls.map(([, init]) => init.headers['Idempotency-Key']);
    expect(new Set(keys)).toEqual(new Set(['key-2']));
  });

  it('gives up after 3 attempts', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));

    const result = await postToCrm(submission, config, 'key-3', { fetch, sleep: noSleep });

    expect(result).toEqual({ ok: false, error: 'CRM answered 500' });
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('does not retry a rejection that will not change', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 401 }));

    const result = await postToCrm(submission, config, 'key-4', { fetch, sleep: noSleep });

    expect(result).toEqual({ ok: false, error: 'CRM answered 401' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('sends attachments as files in a multipart body, signing the payload part', async () => {
    const fileUrl = 'https://bucket.s3.eu-west-3.amazonaws.com/abc.pdf';
    const missingUrl = 'https://bucket.s3.eu-west-3.amazonaws.com/gone.pdf';
    const fetch = vi.fn(async (url: string) => {
      if (url === fileUrl)
        return new Response(new Blob(['%PDF'], { type: 'application/pdf' }), {
          status: 200,
          headers: { 'content-length': '4' }
        });
      if (url === missingUrl) return new Response(null, { status: 404 });
      return accepted();
    });

    const result = await postToCrm(
      { ...submission, attachmentUrls: [fileUrl, missingUrl] },
      config,
      'key-5',
      { fetch: fetch as unknown as typeof globalThis.fetch, sleep: noSleep }
    );

    expect(result.ok).toBe(true);
    const [, init] = fetch.mock.calls.find(([url]) => url === config.url) as unknown as [
      string,
      RequestInit & { headers: Record<string, string> }
    ];
    const form = init.body as FormData;
    const payload = form.get('payload') as string;
    expect(init.headers['X-Signature']).toBe(signPayload(payload, 'shh'));
    expect(init.headers['Content-Type']).toBeUndefined();
    const file = form.get('file-1') as File;
    expect(file.name).toBe('abc.pdf');
    expect(file.type).toBe('application/pdf');
    // The file that couldn't be downloaded still reaches the CRM, as a link.
    expect(JSON.parse(payload).attachmentUrls).toEqual([missingUrl]);
  });

  it('sends a file over the size limit as a link without reading its body', async () => {
    const bigUrl = 'https://bucket.s3.eu-west-3.amazonaws.com/huge.zip';
    const cancel = vi.fn().mockResolvedValue(undefined);
    const fetch = vi.fn(async (url: string) => {
      if (url === bigUrl)
        return {
          ok: true,
          headers: new Headers({ 'content-length': String(26 * 1024 * 1024) }),
          body: { cancel },
          blob: () => Promise.reject(new Error('body must not be read'))
        } as unknown as Response;
      return accepted();
    });

    const result = await postToCrm({ ...submission, attachmentUrls: [bigUrl] }, config, 'key-6', {
      fetch: fetch as unknown as typeof globalThis.fetch,
      sleep: noSleep
    });

    expect(result.ok).toBe(true);
    expect(cancel).toHaveBeenCalled();
    const [, init] = fetch.mock.calls.find(([url]) => url === config.url) as unknown as [
      string,
      RequestInit & { body: string }
    ];
    expect(JSON.parse(init.body).attachmentUrls).toEqual([bigUrl]);
  });

  it('stops retrying once the overall deadline has passed', async () => {
    const deadline = new AbortController();
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 503 }));
    const sleep = async () => deadline.abort();

    const result = await postToCrm(submission, config, 'key-7', {
      fetch,
      sleep,
      deadline: deadline.signal
    });

    expect(result).toEqual({ ok: false, error: 'CRM answered 503' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
