import { BLOG_PARAMS, getServerSideSBVersion, getStoryblok } from '$lib/storyblok';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies, url }) => {
  const storyblok = getStoryblok({ fetch });

  try {
    const res = await storyblok.get('cdn/stories', {
      ...BLOG_PARAMS,
      with_tag: url.searchParams.getAll('t').join(','),
      page: 1,
      version: getServerSideSBVersion(cookies)
    });

    return res;
  } catch (err) {
    throw error(404, 'Not found');
  }
};
