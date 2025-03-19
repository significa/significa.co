import { getStoryblok } from '$lib/storyblok';
import { error } from '@sveltejs/kit';

import { getHandbookHierarchyConfig } from '$components/pages/handbook/common/data.js';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;
  const storyblok = getStoryblok({ fetch });

  try {
    const config = await getHandbookHierarchyConfig(storyblok, version);

    return {
      hierarchy: config.content.hierarchy
    };
  } catch (err) {
    console.error('Failed to get Handbook content for the index page', err);
    throw error(404, 'Not found');
  }
};
