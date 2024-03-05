import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const validateDraftMode: Handle = async ({ event, resolve }) => {
  event.locals.version = event.cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

  const response = await resolve(event);
  // Note: https://www.storyblok.com/docs/guide/essentials/visual-editor#visual-editor-preview
  if (event.locals.version === 'draft') {
    response.headers.set('X-Frame-Options', 'ALLOW-FROM storyblok.com');
  }

  return response;
};

export const handle = sequence(validateDraftMode);
