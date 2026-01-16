// Proposals feature not yet implemented for WordPress
// This was a Storyblok-specific feature

import { fetchAwards } from '$lib/content';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;

  // Stub: Proposals functionality needs to be re-implemented for WordPress
  return {
    story: null,
    services: null,
    home: null,
    awards: await fetchAwards({ version, fetch }),
    error: false
  };
};

export const actions = {
  default: async () => {
    // Stub: Proposal password functionality not yet implemented
    return {};
  }
};
