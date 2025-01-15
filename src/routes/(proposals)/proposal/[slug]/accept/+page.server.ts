import { STORYBLOK_PROPOSALS_TOKEN } from '$env/static/private';
import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { getStoryblok, isStatusError } from '$lib/storyblok';
import type { ProposalStoryblok } from '$types/bloks.js';
import type { ISbStoryData } from '@storyblok/js';

const getCookieName = (slug: string) => `PROPOSAL_TOKEN_${slug.toUpperCase().replace('-', '_')}`;

export const load = async ({ cookies, fetch, params, url }) => {
  const version: 'draft' | 'published' = cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

  const storyblok = getStoryblok({ fetch }, { accessToken: STORYBLOK_PROPOSALS_TOKEN });

  const password = cookies.get(getCookieName(params.slug));

  const failAuthentication = () => {
    cookies.delete(getCookieName(params.slug));
    return { error: true };
  };

  if (!password) {
    return {};
  }

  let res;

  try {
    res = await storyblok.get('cdn/stories/' + url.pathname.replace('/accept', ''), {
      version,
      resolve_relations: ['proposal.created_by']
    });
  } catch (error) {
    if (isStatusError(error) && error.status === 404) {
      return failAuthentication();
    }

    throw error;
  }

  const story: ISbStoryData<ProposalStoryblok> = res.data.story;

  if (story.content.password !== password) {
    return failAuthentication();
  }

  return { story };
};
