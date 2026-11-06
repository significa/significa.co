// Fields people never see but form-filling bots do (get-a-quote only). They sit off-screen,
// hidden from screen readers and skipped by the keyboard, with labels that read like real
// fields, so a value in either means a bot. Two kinds of bait: some bots fill every text field
// but leave checkboxes alone, others tick every checkbox. Neither name is one browsers autofill.

export const HONEYPOT_FIELD = 'referral_code';
export const HONEYPOT_CHECKBOX = 'newsletter_opt_in';

export const isHoneypotTripped = (fields: Record<string, unknown>): boolean =>
  [HONEYPOT_FIELD, HONEYPOT_CHECKBOX].some((name) => {
    const value = fields[name];
    return typeof value === 'string' && value.trim() !== '';
  });
