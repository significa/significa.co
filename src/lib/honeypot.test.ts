import { describe, expect, it } from 'vitest';
import { HONEYPOT_FIELD, isHoneypotTripped } from './honeypot';

describe('isHoneypotTripped', () => {
  it('lets a person through: the field is empty or absent', () => {
    expect(isHoneypotTripped({ name: 'Ada', [HONEYPOT_FIELD]: '' })).toBe(false);
    expect(isHoneypotTripped({ name: 'Ada', [HONEYPOT_FIELD]: '   ' })).toBe(false);
    expect(isHoneypotTripped({ name: 'Ada' })).toBe(false);
  });

  it('catches a bot: the field has a value', () => {
    expect(isHoneypotTripped({ name: 'Bot', [HONEYPOT_FIELD]: 'SAVE20' })).toBe(true);
  });
});
