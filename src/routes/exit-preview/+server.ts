import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { sanitizeSlug } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
  const path = sanitizeSlug(url.searchParams.get('return_to') || '/');

  cookies.delete(PREVIEW_COOKIE_KEY, {
    path: '/'
  });

  throw redirect(307, path);
};
