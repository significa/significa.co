import type { ISbStoryData } from '@storyblok/js';
import { getStoryblok } from '$lib/storyblok';
import type { HandbookStoryblok } from '$types/bloks';
import { error } from '@sveltejs/kit';
import { groupHandbookChapters } from '$components/pages/handbook-index/utils';

export const load = async ({ locals, fetch }) => {
  const version = locals.version;
  const storyblok = getStoryblok({ fetch });

  const exclusions = [
    'body',
    'seo_title',
    'seo_og_image',
    'seo_og_image',
    'seo_description',
    'change_frequency',
    'seo_canonical_url',
    'structure_data_markup',
    'priority'
  ] as const;

  try {
    const res = await storyblok.get('cdn/stories', {
      starts_with: 'handbook',
      cv: Date.now(),
      version,
      excluding_fields: exclusions.join(',')
    });

    const stories = res.data.stories as ISbStoryData<HandbookStoryblok>[];

    return { chapters: groupHandbookChapters(stories) };
  } catch (err) {
    console.error('Failed to get Handbook content for the index page', err);
    throw error(404, 'Not found');
  }
};
