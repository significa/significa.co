import translations from './data.json';
import type { TranslationKey } from './types';

import { getMatches, getMessage, getParts, parseMatchesForKey } from './utils';

export function t(key: TranslationKey, values: Record<string, string> = {}) {
  const message = getMessage(translations, key);
  const matches = getMatches(message);
  const parts = getParts(message);

  if (!matches) {
    return message;
  }

  const matchedValues = parseMatchesForKey(matches, key, values);
  const elements = parts.map((part) => {
    return matchedValues[part] || part;
  });

  return Array.isArray(elements) ? elements.join('') : elements;
}
