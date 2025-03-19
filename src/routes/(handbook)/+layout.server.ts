import { getStoryblok } from '$lib/storyblok';
import type { ConfigurationStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';
import { fetchCareers } from '$lib/content';

export const load = async ({ fetch, locals }) => {
  const version = locals.version;
  const storyblok = getStoryblok({ fetch });

  const res = await storyblok.get('cdn/stories/configuration/handbook-navigation', {
    version,
    resolve_relations:
      'configuration.primary_navigation,configuration.secondary_navigation,footer-column-internal.links'
  });

  return {
    configuration: res.data.story as ISbStoryData<ConfigurationStoryblok>,
    careers: await fetchCareers({ version, fetch }),
    version
  };
};
