import { SLACK_WEBHOOK_URL, STORYBLOK_PROPOSALS_TOKEN } from '$env/static/private';
import { PREVIEW_COOKIE_KEY } from '$lib/constants';
import { getStoryblok } from '$lib/storyblok';
import type { ProposalStoryblok } from '$types/bloks.js';
import type { ISbStoryData } from '@storyblok/js';
import { error, json } from '@sveltejs/kit';

const getCookieName = (slug: string) => `PROPOSAL_TOKEN_${slug.toUpperCase().replace('-', '_')}`;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies, fetch }) {
  const { slug } = await request.json().catch(() => ({}));
  const password = typeof slug === 'string' && cookies.get(getCookieName(slug));
  if (!password) throw error(401, 'Unauthorized');

  // Same check as the accept page: only someone holding the proposal's password can accept it,
  // and the Slack message uses the stored title and client rather than anything the client sent
  const storyblok = getStoryblok({ fetch }, { accessToken: STORYBLOK_PROPOSALS_TOKEN });
  const story: ISbStoryData<ProposalStoryblok> | undefined = await storyblok
    .get(`cdn/stories/proposal/${slug}`, {
      version: cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published'
    })
    .then((res) => res.data.story)
    .catch(() => undefined);
  if (!story || story.content.password !== password) throw error(401, 'Unauthorized');

  const { title, client } = story.content;
  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `Proposal ${title} accepted by ${client} on ${new Date().toLocaleString()}.`
    })
  });

  return json({ ok: response.ok });
}
