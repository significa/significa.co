import { fetchHandbookPage, normalizeWordPressPost } from '$lib/content.js';
import type { DynamicPage, HandbookPage } from '$lib/content.js';
import { error } from '@sveltejs/kit';

const isHandbookStory = (story: DynamicPage): story is HandbookPage =>
  story.content.component === 'handbook';

export const load = async ({ locals, fetch, url }) => {
  const version = locals.version;

  // Remove leading /handbook/ from the path to get the slug
  const slug = url.pathname.replace(/^\/handbook\//, '') || 'index';

  const wpPage = await fetchHandbookPage(slug, { fetch });
  const story = normalizeWordPressPost(wpPage);

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
