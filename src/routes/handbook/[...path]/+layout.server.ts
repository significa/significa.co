import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { getStoryblok } from '$lib/storyblok';
import type { StoryblokLinks } from '$types/cms';
import { error } from '@sveltejs/kit';

export const load = async ({ cookies, fetch }) => {
  const version: 'draft' | 'published' = cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';
  const storyblok = getStoryblok({ fetch });

  try {
    const res = await storyblok.get('cdn/links', {
      version,
      starts_with: 'handbook/'
    });

    return { links: res.data.links as StoryblokLinks };
  } catch (err) {
    throw error(404, 'Not found');
  }
};
