import { describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile.server';

describe('verifyTurnstile', () => {
  it('sends the token, secret and IP, and accepts a successful check', async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true }));

    expect(await verifyTurnstile('tok', 'shh', '1.2.3.4', { fetch })).toBe(true);
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
      secret: 'shh',
      response: 'tok',
      remoteip: '1.2.3.4'
    });
  });

  it('rejects a missing token without calling Cloudflare', async () => {
    const fetch = vi.fn();

    expect(await verifyTurnstile(undefined, 'shh', '1.2.3.4', { fetch })).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects a failed check and a network error', async () => {
    const failed = vi
      .fn()
      .mockResolvedValue(
        Response.json({ success: false, 'error-codes': ['invalid-input-response'] })
      );
    const down = vi.fn().mockRejectedValue(new TypeError('fetch failed'));

    expect(await verifyTurnstile('tok', 'shh', '1.2.3.4', { fetch: failed })).toBe(false);
    expect(await verifyTurnstile('tok', 'shh', '1.2.3.4', { fetch: down })).toBe(false);
  });
});
