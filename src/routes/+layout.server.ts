import { PREVIEW_COOKIE_KEY } from '$lib/constants';

export const load = async ({ cookies }) => {
  const version: 'draft' | 'published' = cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

  return {
    version
  };
};
