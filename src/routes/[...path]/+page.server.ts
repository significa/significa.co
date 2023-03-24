import { fetchPage, getServerSideSBVersion } from '$lib/storyblok';
import { error } from '@sveltejs/kit';
import { actions } from '$lib/forms';

export const load = async ({ params, cookies, fetch }) => {
  try {
    const page = await fetchPage({
      slug: params.path,
      version: getServerSideSBVersion(cookies),
      fetch
    });

    return { page };
  } catch (err) {
    throw error(404, 'Not found');
  }
};

export { actions };
