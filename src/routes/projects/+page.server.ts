import { error } from '@sveltejs/kit';
import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { fetchProjects } from '$lib/content';

// This route is unecessary as [...path] already handles the projects index
// we're just leaving it because it might be a bit more performant as
// the other one has a first request to check the page type and only then fetches the projects

// WARNING: this is not the only source of truth for this page. When in the drawer, the content will be fetched by `fetchPage`

export const load = async ({ fetch, cookies }) => {
  try {
    return {
      projects: await fetchProjects({
        fetch,
        version: cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published'
      })
    };
  } catch (err) {
    throw error(404, 'Not found');
  }
};
