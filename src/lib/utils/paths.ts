export const sanitizeSlug = (slug: string) => {
  // nothing for now, but it's good to have a centralized function that we pass all slugs through
  if (slug.startsWith('http')) return slug;

  return '/' + slug.replace(/^\/+/, '');
};
