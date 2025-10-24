import { fetchCareers } from '$lib/content';

export const load = async ({ fetch, locals }) => {
  const version = locals.version;

  return {
    // Note: WordPress doesn't have handbook navigation config like Storyblok
    // This would need to be fetched from WordPress menus or a specific page
    configuration: null,
    careers: await fetchCareers({ version, fetch }),
    version
  };
};
