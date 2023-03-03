import { fetchStory, getServerSideSBVersion } from '$lib/storyblok';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, cookies, fetch }) => {
  try {
    const story = await fetchStory({
      slug: params.path,
      version: getServerSideSBVersion(cookies),
      fetch
    });

    return { story };
  } catch (err) {
    throw error(404, 'Not found');
  }
}) satisfies PageServerLoad;
