import type { getStoryblok } from '$lib/storyblok';

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

export const getHandbookHierarchyConfig = async (
  storyblok: ReturnType<typeof getStoryblok>,
  version: 'draft' | 'published' | undefined,
  context: keyof typeof EXCLUSIONS = 'index'
) => {
  try {
    const res = await storyblok.get('cdn/stories/configuration/handbook-hierarchy-config', {
      version,
      excluding_fields: EXCLUSIONS[context].join(','),
      resolve_relations: 'handbook-level.homepage,handbook-level.children'
    });

    return res.data.story;
  } catch (err) {
    console.error('Failed to fetch Handbook Hierarchy Config', err);
    throw err;
  }
};
