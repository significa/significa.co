import { fetchPage } from '$lib/content.js';
import type { DynamicPage, HandbookPage } from '$lib/content.js';
import { error } from '@sveltejs/kit';

const isHandbookStory = (story: DynamicPage): story is HandbookPage =>
  story.content.component === 'handbook';

export const load = async ({ locals, fetch, url }) => {
  const version = locals.version;

  const page = await fetchPage({
    slug: url.pathname,
    version,
    fetch,
    url
  });

  const story = page.story;

  if (isHandbookStory(story)) {
    return { story };
  } else {
    console.error(
      'Only "Handbook" pages can live inside the /handbook folder, got',
      story.content.component
    );
    throw error(404, 'Not found');
  }
};
