import { browser } from '$app/environment';
import { page } from '$app/stores';
import { env } from '$env/dynamic/public';
import type {
  BlogPostStoryblok,
  HandbookStoryblok,
  PageStoryblok,
  ProjectStoryblok,
  TeamMemberStoryblok
} from '$types/bloks';
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

export const PAGE_PARAMS = {
  resolve_links: 'url',
  resolve_relations: 'blog-post.author,blog-post.project,project.team'
} as const;

export const BLOG_PARAMS = {
  per_page: 10,
  content_type: 'blog-post',
  sort_by: 'first_published_at:desc',
  resolve_relations: 'blog-post.author'
} as const;

export const PROJECT_PARAMS = {
  per_page: 50,
  content_type: 'project'
};

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

// Dynamic Pages
export type Page = ISbStoryData<PageStoryblok>;
export type BlogPostPage = ISbStoryData<
  Omit<BlogPostStoryblok, 'author' | 'project'> & {
    author: ISbStoryData<TeamMemberStoryblok>;
    project: ISbStoryData<ProjectStoryblok>;
  }
>;
export type HandbookPage = ISbStoryData<HandbookStoryblok>;
export type ProjectPage = ISbStoryData<
  Omit<ProjectStoryblok, 'team'> & {
    team: ISbStoryData<TeamMemberStoryblok>[];
  }
>;
export type TeamMemberPage = ISbStoryData<TeamMemberStoryblok>;

export type DynamicPage = Page | BlogPostPage | HandbookPage | ProjectPage | TeamMemberPage;

export async function fetchPage(options: {
  slug: string;
  version?: 'draft' | 'published';
  fetch?: typeof fetch;
}): Promise<PageResult> {
  // remove leading slashes. svelte-kit's path params start with no slash, but links will have a leading slash
  const noLeadingSlash = options.slug.replace(/^\/+/, '');

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  try {
    if (noLeadingSlash === HOME_SLUG) {
      // home is in '/', so '/home' should 404
      throw new Error();
    }

    const { data }: { data: { story?: DynamicPage } } = await storyblok.get(
      `cdn/stories/${noLeadingSlash || HOME_SLUG}`,
      {
        version: options.version || 'published',
        ...PAGE_PARAMS
      }
    );

    if (!data.story?.id) throw new Error();

    // Blog posts need to fetch related posts
    if (data.story.content.component === 'blog-post') {
      const {
        data: { stories }
      } = await storyblok.get('cdn/stories', {
        version: options.version || 'published',
        ...BLOG_PARAMS,
        per_page: 3,
        page: 1,
        excluding_ids: data.story.id.toString(),
        with_tag: data.story.tag_list.join(',')
      });

      return {
        story: data.story,
        relatedPosts: stories as BlogPostPage[]
      };
    }

    return { story: data.story };
  } catch (err) {
    throw new Error('Not found');
  }
}

export type PageResult = {
  story: DynamicPage;
  relatedPosts?: BlogPostPage[];
};

export const isPage = (page: PageResult): page is { story: Page } => {
  return page.story.content.component === 'page';
};

export const isBlogPostPage = (
  page: PageResult
): page is { story: BlogPostPage; relatedPosts: BlogPostPage[] } => {
  return page.story.content.component === 'blog-post';
};

export const isHandbookPage = (page: PageResult): page is { story: HandbookPage } => {
  return page.story.content.component === 'handbook';
};

export const isProjectPage = (page: PageResult): page is { story: ProjectPage } => {
  return page.story.content.component === 'project';
};

export const isTeamMemberPage = (page: PageResult): page is { story: TeamMemberPage } => {
  return page.story.content.component === 'team-member';
};
