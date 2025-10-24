import { error } from '@sveltejs/kit';
import { fetchHandbookPages } from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;

  try {
    const pages = await fetchHandbookPages({ version, fetch });

    // Build hierarchy from WordPress pages
    const hierarchy = pages.map(page => ({
      id: page.id,
      slug: page.slug,
      title: page.title?.rendered || '',
      parent: page.acf?.parent_page || null,
      order: page.acf?.order || 0
    }));

    return { hierarchy };
  } catch (err) {
    console.error('Failed to get Handbook content for the index page', err);
    throw error(404, 'Not found');
  }
};
