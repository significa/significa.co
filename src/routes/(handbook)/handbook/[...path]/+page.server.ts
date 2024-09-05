import { fetchPage } from '$lib/content.js';
import type { DynamicPage, HandbookPage } from '$lib/content.js';
import { error } from '@sveltejs/kit';

const isHandbookStory = (story: DynamicPage): story is HandbookPage =>
  story.content.component === 'handbook';

export const load = async ({ params, locals, fetch, url }) => {
  const version = locals.version;

  try {
    const page = await fetchPage({
      slug: 'handbook/' + params.path,
      version,
      fetch,
      url
    });

    const story = page.story;

    if (isHandbookStory(story)) {
      return { story };
    } else {
      console.error('Only "Handbook" pages can live inside the /handbook path');
      throw error(404, 'Not found');
    }
  } catch (err) {
    console.error('Failed to get storyblok page:', params.path, err);
    throw error(404, 'Not found');
  }
};
