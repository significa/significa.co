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
  'project.published-in',
  'recognitions',
  'services',
  'deliverables',
  'links',
  'project.team',
  'handbook',
  'on-this-page',
  'close',
  'filters',
  'clear-all',
  'view-project',
  'member.projects.title',
  'member.projects.subtitle',
  'member.posts.title',
  'member.posts.subtitle',
  'member.about'
] as const;

export type TranslationKey = (typeof TranslationKeys)[number];
export function isTranslationKey(key: string | TranslationKey): key is TranslationKey {
  return TranslationKeys.includes(key as TranslationKey);
}
