import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { getStoryblok } from '$lib/storyblok';
import type { BlogPostStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, fetch }) => {
  const version: 'draft' | 'published' = cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';
  const storyblok = getStoryblok({ fetch });

  try {
    const { data }: { data: { story?: ISbStoryData<BlogPostStoryblok> } } = await storyblok.get(
      `cdn/stories/blog/${params.slug}`,
      { version, resolve_links: 'url' }
    );

    if (!data.story?.id) throw new Error();

    return { story: data.story };
  } catch (err) {
    throw error(404, 'Not found');
  }
}) satisfies PageServerLoad;
