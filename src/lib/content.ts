/**
 * Content Fetching - WordPress Integration
 *
 * This module provides a compatible API with the previous Storyblok integration
 * but fetches data from WordPress instead.
 */

import {
  fetchPage as wpFetchPage,
  fetchPages as wpFetchPages,
  fetchBlogPosts as wpFetchBlogPosts,
  fetchBlogPost as wpFetchBlogPost,
  fetchProjects as wpFetchProjects,
  fetchProject as wpFetchProject,
  fetchTeamMembers as wpFetchTeamMembers,
  fetchTeamMember as wpFetchTeamMember,
  fetchCareers as wpFetchCareers,
  fetchCareer as wpFetchCareer,
  fetchHandbookPages as wpFetchHandbookPages,
  fetchHandbookPage as wpFetchHandbookPage,
  fetchAwards as wpFetchAwards,
  getRelatedBlogPosts,
  getRelatedProjects
} from './wordpress';

import type {
  WordPressPage,
  WordPressBlogPost,
  WordPressProject,
  WordPressTeamMember,
  WordPressCareer,
  WordPressHandbook,
  WordPressRecognition
} from './types/wordpress';

// Constants
export const HOME_SLUG = 'home';

/**
 * Fetch page by slug (home or any page)
 */
export async function fetchPage(
  slug: string,
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) {
  try {
    return await wpFetchPage(slug);
  } catch (error) {
    console.error(`Error fetching page: ${slug}`, error);
    throw error;
  }
}

/**
 * Fetch all careers/job openings
 */
export async function fetchCareers(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressCareer[]> {
  try {
    return await wpFetchCareers({ active_only: options.version === 'published' });
  } catch (error) {
    console.error('Error fetching careers', error);
    return [];
  }
}

/**
 * Fetch all awards/recognition
 */
export async function fetchAwards(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressRecognition[]> {
  try {
    return await wpFetchAwards();
  } catch (error) {
    console.error('Error fetching awards', error);
    return [];
  }
}

/**
 * Fetch award types (for WordPress, we don't have separate types)
 */
export async function fetchAwardsTypes(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<any[]> {
  // In WordPress, we don't have separate award types
  // Return empty array for compatibility
  return [];
}

/**
 * Fetch team members
 */
export async function fetchTeamMembers(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressTeamMember[]> {
  try {
    return await wpFetchTeamMembers({ active_only: options.version === 'published' });
  } catch (error) {
    console.error('Error fetching team members', error);
    return [];
  }
}

/**
 * Fetch projects with optional filtering
 */
export async function fetchProjects(
  params?: {
    per_page?: number;
    filter_by_tag?: string;
    version?: 'draft' | 'published';
    fetch?: typeof fetch;
  }
): Promise<WordPressProject[]> {
  try {
    return await wpFetchProjects({
      per_page: params?.per_page || 50,
      exclude_hidden: params?.version === 'published'
    });
  } catch (error) {
    console.error('Error fetching projects', error);
    return [];
  }
}

/**
 * Fetch blog posts with filtering and pagination
 */
export async function fetchBlogPosts(
  params?: {
    per_page?: number;
    page?: number;
    filter_query?: {
      author?: { in_array?: string };
      hide_from_listings?: { is?: string };
    };
    version?: 'draft' | 'published';
    fetch?: typeof fetch;
  }
): Promise<WordPressBlogPost[]> {
  try {
    return await wpFetchBlogPosts({
      per_page: params?.per_page || 10,
      page: params?.page || 1,
      exclude_hidden: params?.filter_query?.hide_from_listings?.is !== 'true'
    });
  } catch (error) {
    console.error('Error fetching blog posts', error);
    return [];
  }
}

/**
 * Fetch handbook pages
 */
export async function fetchHandbookPages(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressHandbook[]> {
  try {
    return await wpFetchHandbookPages();
  } catch (error) {
    console.error('Error fetching handbook pages', error);
    return [];
  }
}

/**
 * PageResult type for compatibility
 * This matches the structure used by the page routes
 */
export type PageResult = {
  story: WordPressPage | WordPressBlogPost | WordPressProject | WordPressTeamMember | WordPressCareer | WordPressHandbook;
  index?: {
    posts?: WordPressBlogPost[];
    projects?: WordPressProject[];
    team?: WordPressTeamMember[];
    careers?: WordPressCareer[];
    handbook?: WordPressHandbook[];
  };
  related?: {
    posts?: WordPressBlogPost[];
    projects?: WordPressProject[];
  };
};

/**
 * Build a PageResult object from WordPress data
 * This is used by the page routes to structure the data
 */
export async function buildPageResult(
  story: any,
  options: {
    includePosts?: boolean;
    includeProjects?: boolean;
    includeTeam?: boolean;
    includeCareers?: boolean;
    includeHandbook?: boolean;
    includeRelated?: boolean;
  } = {}
): Promise<PageResult> {
  const result: PageResult = {
    story
  };

  // Build index data
  const index: any = {};

  if (options.includePosts) {
    index.posts = await fetchBlogPosts({ per_page: 10 });
  }

  if (options.includeProjects) {
    index.projects = await fetchProjects({ per_page: 50 });
  }

  if (options.includeTeam) {
    index.team = await fetchTeamMembers();
  }

  if (options.includeCareers) {
    index.careers = await fetchCareers();
  }

  if (options.includeHandbook) {
    index.handbook = await fetchHandbookPages();
  }

  if (Object.keys(index).length > 0) {
    result.index = index;
  }

  // Build related data
  if (options.includeRelated && story.id) {
    const related: any = {};

    if (story.type === 'blog_post') {
      related.posts = await getRelatedBlogPosts(story.id, 3);
    }

    if (story.type === 'project') {
      related.projects = await getRelatedProjects(story.id, 3);
    }

    if (Object.keys(related).length > 0) {
      result.related = related;
    }
  }

  return result;
}

/**
 * Helper to determine content component/type
 */
export function getContentComponent(post: any): string {
  // Map WordPress post types to component names
  const typeMap: Record<string, string> = {
    'page': 'page',
    'blog_post': 'blog-post',
    'project': 'project',
    'team_member': 'team-member',
    'career': 'career',
    'handbook': 'handbook',
    'landing_page': 'landing-page',
    'recognition': 'recognition-entry'
  };

  return typeMap[post.type] || 'page';
}

/**
 * Convert WordPress post to story-like structure for compatibility
 */
export function normalizeWordPressPost(post: any) {
  return {
    ...post,
    name: post.title?.rendered || '',
    full_slug: post.slug,
    content: {
      component: getContentComponent(post),
      body: post.acf?.content_blocks || [],
      ...post.acf
    },
    first_published_at: post.date,
    published_at: post.date,
    created_at: post.date,
    uuid: `wp-${post.id}`,
    is_startpage: post.slug === HOME_SLUG
  };
}
