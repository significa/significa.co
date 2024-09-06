import type { getStoryblok } from '$lib/storyblok';
import type { HandbookStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';

const EXCLUSIONS = {
  index: [
    'body',
    'seo_title',
    'seo_og_image',
    'seo_og_image',
    'seo_description',
    'change_frequency',
    'seo_canonical_url',
    'structure_data_markup',
    'priority'
  ],
  sidebar: [
    'body',
    'seo_title',
    'seo_og_image',
    'seo_og_image',
    'seo_description',
    'change_frequency',
    'seo_canonical_url',
    'structure_data_markup',
    'priority',
    'cover',
    'highlight'
  ]
} as const;

export const getHandbookEntries = async (
  storyblok: ReturnType<typeof getStoryblok>,
  version: 'draft' | 'published' | undefined,
  context: keyof typeof EXCLUSIONS = 'index'
) => {
  try {
    const res = await storyblok.get('cdn/stories', {
      starts_with: 'handbook',
      cv: Date.now(),
      version,
      excluding_fields: EXCLUSIONS[context].join(',')
    });

    return res.data.stories as ISbStoryData<HandbookStoryblok>[];
  } catch (err) {
    throw new Error('Failed to fetch Handbook entries', { cause: err });
  }
};
