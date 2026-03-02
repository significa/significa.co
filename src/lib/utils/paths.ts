import { HOME_SLUG } from '$lib/constants';

export const sanitizeSlug = (slug: string) => {
  if (slug === HOME_SLUG) return '/';

  // nothing for now, but it's good to have a centralized function that we pass all slugs through
  if (slug.startsWith('http')) return slug;

  // always start with a slash and end with no slash
  return '/' + slug.replace(/^\/+/, '').replace(/\/+$/, '');
};

export function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[^\w-]/g, '-')
    .replace(/-+/g, '-');
}
