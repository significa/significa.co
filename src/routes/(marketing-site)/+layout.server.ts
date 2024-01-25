import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { getStoryblok } from '$lib/storyblok';
import type { ConfigurationStoryblok } from '$types/bloks';
import { error } from '@sveltejs/kit';
import type { ISbStoryData } from '@storyblok/js';
import { fetchAwards, fetchAwardsTypes, fetchCareers } from '$lib/content';

export const load = async ({ cookies, fetch }) => {
  const version: 'draft' | 'published' = cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';
  const storyblok = getStoryblok({ fetch });

  try {
    const res = await storyblok.get('cdn/stories/configuration', {
      version,
      resolve_relations:
        'configuration.primary_navigation,configuration.secondary_navigation,footer-column-internal.links'
    });

    return {
      configuration: res.data.story as ISbStoryData<ConfigurationStoryblok>,
      careers: await fetchCareers({ version, fetch }),
      awards: await fetchAwards({ version, fetch }),
      awardsTypes: await fetchAwardsTypes({ version, fetch }),
      version
    };
  } catch (err) {
    throw error(404, 'Not found');
  }
};
