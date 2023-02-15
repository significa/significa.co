export const TranslationKeys = ['hello'] as const;

export type TranslationKey = (typeof TranslationKeys)[number];
export function isTranslationKey(key: string | TranslationKey): key is TranslationKey {
  return TranslationKeys.includes(key as TranslationKey);
}
