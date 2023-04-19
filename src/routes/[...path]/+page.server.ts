import { error } from '@sveltejs/kit';
import { actions } from '$lib/forms';
import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { fetchPage } from '$lib/content';

export const load = async ({ params, cookies, fetch, url }) => {
  try {
    const page = await fetchPage({
      slug: params.path,
      version: cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published',
      fetch,
      url
    });

    return { page };
  } catch (err) {
    console.error(err);
    throw error(404, 'Not found');
  }
};

export { actions };
