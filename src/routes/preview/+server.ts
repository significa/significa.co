import { BYPASS_TOKEN } from '$env/static/private';
import { ISR_BYPASS_COOKIE_KEY, PREVIEW_COOKIE_KEY } from '$lib/constants';
import { sanitizeSlug } from '$lib/utils/paths';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
  const path = sanitizeSlug(url.searchParams.get('path') || '/');

  url.searchParams.delete('path');

  cookies.set(PREVIEW_COOKIE_KEY, 'true', {
    path: '/',
    secure: true,
    sameSite: 'none'
  });
  cookies.set(ISR_BYPASS_COOKIE_KEY, BYPASS_TOKEN, {
    path: '/',
    secure: true,
    sameSite: 'none'
  });

  // preserve storyblok's query params
  throw redirect(307, `${path}?${url.searchParams.toString()}`);
};
