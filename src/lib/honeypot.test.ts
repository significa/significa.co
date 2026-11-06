import { describe, expect, it } from 'vitest';
import { HONEYPOT_CHECKBOX, HONEYPOT_FIELD, isHoneypotTripped } from './honeypot';

describe('isHoneypotTripped', () => {
  it('lets a person through: both baits empty or absent', () => {
    expect(isHoneypotTripped({ name: 'Ada', [HONEYPOT_FIELD]: '' })).toBe(false);
    expect(isHoneypotTripped({ name: 'Ada', [HONEYPOT_FIELD]: '   ' })).toBe(false);
    // An unticked checkbox isn't sent at all.
    expect(isHoneypotTripped({ name: 'Ada' })).toBe(false);
  });

  it('catches a bot that fills in the text field', () => {
    expect(isHoneypotTripped({ name: 'Bot', [HONEYPOT_FIELD]: 'SAVE20' })).toBe(true);
  });

  it('catches a bot that ticks the checkbox', () => {
    expect(isHoneypotTripped({ name: 'Bot', [HONEYPOT_CHECKBOX]: 'yes' })).toBe(true);
  });
});
