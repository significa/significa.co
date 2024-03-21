import { getStoryblok } from '$lib/storyblok';
import type { ConfigurationStoryblok } from '$types/bloks';
import { error } from '@sveltejs/kit';
import type { ISbStoryData } from '@storyblok/js';
import {
  fetchAwards,
  fetchAwardsTypes,
  fetchCareers,
  fetchHomeBlogPosts,
  fetchTeamMembers
} from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;
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
      teamMembers: await fetchTeamMembers({ version, fetch }),
      homePosts: await fetchHomeBlogPosts({ version, fetch }),
      version
    };
  } catch (err) {
    throw error(404, 'Not found');
  }
};
