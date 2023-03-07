import { browser } from '$app/environment';
import { page } from '$app/stores';
import type { PageStories } from '$components/pages/dynamic-page.svelte';
import { env } from '$env/dynamic/public';
import {
  apiPlugin,
  storyblokInit,
  useStoryblokBridge,
  type ISbStoryData,
  type SbSDKOptions
} from '@storyblok/js';
import type { Cookies } from '@sveltejs/kit';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { HOME_SLUG, PREVIEW_COOKIE_KEY } from './constants';

export const getStoryblok = (apiOptions: SbSDKOptions['apiOptions'] = {}) => {
  const { storyblokApi } = storyblokInit({
    accessToken: env.PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      https: true,
      ...apiOptions
    }
  });

  return storyblokApi as NonNullable<ReturnType<typeof storyblokInit>['storyblokApi']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function startStoryblokBridge<T extends { story: ISbStoryData<any> }>(
  id: number,
  onNewStory: (newStory: T['story']) => void
) {
  onMount(async () => {
    getStoryblok();
    useStoryblokBridge(id, onNewStory);
  });
}

export const getServerSideSBVersion = (cookies: Cookies) => {
  return cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';
};

export const getClientSideSBVersion = () => {
  return browser ? get(page).data.version : 'published';
};

export async function fetchStory(options: {
  slug: string;
  version?: 'draft' | 'published';
  fetch?: typeof fetch;
}) {
  // remove leading slashes. svelte-kit's path params start with no slash, but links will have a leading slash
  const noLeadingSlash = options.slug.replace(/^\/+/, '');

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  try {
    if (noLeadingSlash === HOME_SLUG) {
      // home is in '/', so '/home' should 404
      throw new Error();
    }

    const { data }: { data: { story?: PageStories } } = await storyblok.get(
      `cdn/stories/${noLeadingSlash || HOME_SLUG}`,
      {
        version: options.version || 'published',
        resolve_links: 'url',
        resolve_relations: 'blog-post.author,blog-post.project'
      }
    );

    if (!data.story?.id) throw new Error();

    return data.story;
  } catch (err) {
    throw new Error('Not found');
  }
}

export const BLOG_PARAMS = {
  per_page: 10,
  content_type: 'blog-post',
  sort_by: 'first_published_at:desc',
  resolve_relations: 'blog-post.author'
} as const;
