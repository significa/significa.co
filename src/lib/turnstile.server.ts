const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Checks a Turnstile token with Cloudflare. Fails closed: a timeout or outage rejects the submission. */
export const verifyTurnstile = async (
  token: string | undefined,
  secret: string,
  remoteip: string,
  deps: { fetch: typeof fetch } = { fetch }
): Promise<boolean> => {
  if (!token) return false;

  try {
    const response = await deps.fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip }),
      signal: AbortSignal.timeout(10_000)
    });
    const result: { success?: boolean; 'error-codes'?: string[] } = await response.json();
    if (!result.success) console.warn('Turnstile rejected the submission', result['error-codes']);
    return result.success === true;
  } catch (error) {
    console.error('Failed to verify Turnstile token', error);
    return false;
  }
};
