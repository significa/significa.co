import { getServerSideSBVersion, getStoryblok, PROJECT_PARAMS } from '$lib/storyblok';
import { error } from '@sveltejs/kit';
import type { ISbStoryData } from '@storyblok/js';
import type { ProjectStoryblok } from '$types/bloks';

export const load = async ({ fetch, cookies }) => {
  const storyblok = getStoryblok({ fetch });

  try {
    const res: { data: { stories: ISbStoryData<ProjectStoryblok>[] } } = await storyblok.get(
      'cdn/stories',
      {
        ...PROJECT_PARAMS,
        version: getServerSideSBVersion(cookies)
      }
    );

    return { projects: res.data.stories };
  } catch (err) {
    throw error(404, 'Not found');
  }
};
