import { getStoryblok } from '$lib/storyblok';
import { getHandbookHierarchyConfig } from '$components/pages/handbook/common/data.js';

export const load = async ({ locals }) => {
  const version = locals.version;
  const storyblok = getStoryblok({ fetch });

  const config = await getHandbookHierarchyConfig(storyblok, version, 'sidebar');

  return { hierarchy: config.content.hierarchy };
};
