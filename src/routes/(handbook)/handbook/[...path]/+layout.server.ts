import { getStoryblok } from '$lib/storyblok';
import { getHandbookEntries } from '$components/pages/handbook/common/data.js';
import { groupHandbookEntriesByChapter } from '$components/pages/handbook/handbook-page/utils.js';

export const load = async ({ locals }) => {
  const version = locals.version;
  const storyblok = getStoryblok({ fetch });

  const stories = await getHandbookEntries(storyblok, version, 'sidebar');

  const chapters = groupHandbookEntriesByChapter(stories);

  return { chapters };
};
