export const TranslationKeys = [
  'expand',
  'related-project.title',
  'related-project.description',
  'related-project.link',
  'author-page',
  'related-posts.title',
  'blog.title',
  'blog.load-more',
  'blog.no-results',
  'blog.clear-tags'
] as const;

export type TranslationKey = (typeof TranslationKeys)[number];
export function isTranslationKey(key: string | TranslationKey): key is TranslationKey {
  return TranslationKeys.includes(key as TranslationKey);
}
