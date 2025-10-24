import {
  fetchAwards,
  fetchAwardsTypes,
  fetchCareers,
  fetchHomeBlogPosts,
  fetchTeamMembers
} from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;

  return {
    // Note: WordPress doesn't have a "configuration" concept like Storyblok
    // Site configuration would need to come from WordPress options or a specific page
    configuration: null,
    careers: await fetchCareers({ version, fetch }),
    awards: await fetchAwards({ version, fetch }),
    awardsTypes: await fetchAwardsTypes({ version, fetch }),
    teamMembers: await fetchTeamMembers({ version, fetch }),
    homePosts: await fetchHomeBlogPosts({ version, fetch }),
    version
  };
};
