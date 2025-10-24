import { fetchHandbookPages } from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;

  // Fetch all handbook pages from WordPress
  const pages = await fetchHandbookPages({ version, fetch });

  // Build hierarchy from WordPress pages
  // WordPress handbook pages should have parent/child relationships via ACF
  const hierarchy = pages.map(page => ({
    id: page.id,
    slug: page.slug,
    title: page.title?.rendered || '',
    parent: page.acf?.parent_page || null,
    order: page.acf?.order || 0
  }));

  return { hierarchy };
};
