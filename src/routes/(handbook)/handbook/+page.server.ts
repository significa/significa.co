import { getStoryblok } from '$lib/storyblok';
import { error } from '@sveltejs/kit';
import { groupMainHandbookEntriesByChapter } from '$components/pages/handbook/index-page/utils';
import { getHandbookEntries } from '$components/pages/handbook/common/data.js';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;
  const storyblok = getStoryblok({ fetch });

  try {
    const stories = await getHandbookEntries(storyblok, version);

    return { chapters: groupMainHandbookEntriesByChapter(stories) };
  } catch (err) {
    console.error('Failed to get Handbook content for the index page', err);
    throw error(404, 'Not found');
  }
};
