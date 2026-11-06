// A field people never see but form-filling bots do (get-a-quote only). It sits off-screen,
// hidden from screen readers and skipped by the keyboard, so a value in it means a bot. The
// name is plausible enough for a bot to fill in, and isn't one browsers autofill.

export const HONEYPOT_FIELD = 'referral_code';

export const isHoneypotTripped = (fields: Record<string, unknown>): boolean => {
  const value = fields[HONEYPOT_FIELD];
  return typeof value === 'string' && value.trim() !== '';
};
