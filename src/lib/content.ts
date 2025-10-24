/**
 * Content Fetching - WordPress Integration
 *
 * This module provides WordPress REST API integration for all content types.
 */

import type {
  WordPressPage,
  WordPressBlogPost,
  WordPressProject,
  WordPressTeamMember,
  WordPressCareer,
  WordPressHandbook,
  WordPressRecognition
} from './types/wordpress';

// WordPress API URL from environment
const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://dev.shoutmedia.nl/wp-json/wp/v2';

// Type aliases for compatibility
export type HandbookPage = WordPressHandbook;
export type BlogPostPage = WordPressBlogPost;
export type ProjectPage = WordPressProject;

// Constants for compatibility with existing code
export const HOME_SLUG = 'home';

export const BLOG_PARAMS = {
  per_page: 10,
  _embed: true,
  orderby: 'date',
  order: 'desc'
} as const;

export const PROJECT_PARAMS = {
  per_page: 50,
  _embed: true
} as const;

export const CAREERS_PARAMS = {
  per_page: 50,
  _embed: true
} as const;

export const TEAM_MEMBER_PARAMS = {
  per_page: 100,
  _embed: true
} as const;

export const AWARDS_PARAMS = {
  per_page: 100,
  _embed: true
} as const;

/**
 * Generic fetch function for WordPress REST API
 */
async function fetchFromWordPress<T>(
  endpoint: string,
  params?: Record<string, any>,
  customFetch?: typeof fetch
): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const fetchFn = customFetch || fetch;
    const response = await fetchFn(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WordPress API error (${response.status}): ${errorText}`);
      throw new Error(`WordPress API error (${response.status}): ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching from WordPress: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Fetch single page by slug
 */
export async function fetchPage(
  slug: string,
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressPage> {
  const pages = await fetchFromWordPress<WordPressPage[]>(
    '/pages',
    { slug, _embed: true },
    options.fetch
  );

  if (!pages || pages.length === 0) {
    throw new Error(`Page not found: ${slug}`);
  }

  return pages[0];
}

/**
 * Fetch all pages
 */
export async function fetchPages(
  options: { per_page?: number; fetch?: typeof fetch } = {}
): Promise<WordPressPage[]> {
  return fetchFromWordPress<WordPressPage[]>(
    '/pages',
    { per_page: options.per_page || 100, _embed: true },
    options.fetch
  );
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
  const wpParams: any = {
    ...BLOG_PARAMS,
    per_page: params?.per_page || BLOG_PARAMS.per_page,
    page: params?.page || 1
  };

  // Filter by author if specified
  if (params?.filter_query?.author?.in_array) {
    wpParams.author = params.filter_query.author.in_array;
  }

  const posts = await fetchFromWordPress<WordPressBlogPost[]>(
    '/posts',
    wpParams,
    params?.fetch
  );

  // Filter out posts with hide_from_listings if requested
  if (params?.filter_query?.hide_from_listings?.is !== 'true') {
    return posts.filter(post => !post.acf?.hide_from_listings);
  }

  return posts;
}

/**
 * Fetch single blog post by slug
 */
export async function fetchBlogPost(
  slug: string,
  options: { fetch?: typeof fetch } = {}
): Promise<WordPressBlogPost> {
  const posts = await fetchFromWordPress<WordPressBlogPost[]>(
    '/posts',
    { slug, _embed: true },
    options.fetch
  );

  if (!posts || posts.length === 0) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return posts[0];
}

/**
 * Fetch all projects
 */
export async function fetchProjects(
  params?: {
    per_page?: number;
    filter_by_tag?: string;
    version?: 'draft' | 'published';
    fetch?: typeof fetch;
  }
): Promise<WordPressProject[]> {
  const wpParams: any = {
    ...PROJECT_PARAMS,
    per_page: params?.per_page || PROJECT_PARAMS.per_page
  };

  const projects = await fetchFromWordPress<WordPressProject[]>(
    '/project',
    wpParams,
    params?.fetch
  );

  // Filter out hidden projects in published version
  if (params?.version === 'published') {
    return projects.filter(project => !project.acf?.hide_from_listings);
  }

  return projects;
}

/**
 * Fetch single project by slug
 */
export async function fetchProject(
  slug: string,
  options: { fetch?: typeof fetch } = {}
): Promise<WordPressProject> {
  const projects = await fetchFromWordPress<WordPressProject[]>(
    '/project',
    { slug, _embed: true },
    options.fetch
  );

  if (!projects || projects.length === 0) {
    throw new Error(`Project not found: ${slug}`);
  }

  return projects[0];
}

/**
 * Fetch all team members
 */
export async function fetchTeamMembers(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressTeamMember[]> {
  const members = await fetchFromWordPress<WordPressTeamMember[]>(
    '/team_member',
    TEAM_MEMBER_PARAMS,
    options.fetch
  );

  // Filter to active members in published version
  if (options.version === 'published') {
    return members.filter(member => member.acf?.is_active !== false);
  }

  return members;
}

/**
 * Fetch single team member by slug
 */
export async function fetchTeamMember(
  slug: string,
  options: { fetch?: typeof fetch } = {}
): Promise<WordPressTeamMember> {
  const members = await fetchFromWordPress<WordPressTeamMember[]>(
    '/team_member',
    { slug, _embed: true },
    options.fetch
  );

  if (!members || members.length === 0) {
    throw new Error(`Team member not found: ${slug}`);
  }

  return members[0];
}

/**
 * Fetch all careers/job openings
 */
export async function fetchCareers(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressCareer[]> {
  const careers = await fetchFromWordPress<WordPressCareer[]>(
    '/career',
    CAREERS_PARAMS,
    options.fetch
  );

  // Filter to active careers in published version
  if (options.version === 'published') {
    return careers.filter(career => career.acf?.is_active !== false);
  }

  return careers;
}

/**
 * Fetch single career by slug
 */
export async function fetchCareer(
  slug: string,
  options: { fetch?: typeof fetch } = {}
): Promise<WordPressCareer> {
  const careers = await fetchFromWordPress<WordPressCareer[]>(
    '/career',
    { slug, _embed: true },
    options.fetch
  );

  if (!careers || careers.length === 0) {
    throw new Error(`Career not found: ${slug}`);
  }

  return careers[0];
}

/**
 * Fetch handbook pages
 */
export async function fetchHandbookPages(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressHandbook[]> {
  return fetchFromWordPress<WordPressHandbook[]>(
    '/handbook',
    { per_page: 100, _embed: true },
    options.fetch
  );
}

/**
 * Fetch single handbook page by slug
 */
export async function fetchHandbookPage(
  slug: string,
  options: { fetch?: typeof fetch } = {}
): Promise<WordPressHandbook> {
  const pages = await fetchFromWordPress<WordPressHandbook[]>(
    '/handbook',
    { slug, _embed: true },
    options.fetch
  );

  if (!pages || pages.length === 0) {
    throw new Error(`Handbook page not found: ${slug}`);
  }

  return pages[0];
}

/**
 * Generic search/fetch function for entries
 * Used by handbook search and other search functionality
 */
export async function fetchEntries<T = any>(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {},
  searchParams: { starts_with?: string; search_term?: string } = {}
): Promise<T[]> {
  // For WordPress, we'll use the handbook endpoint with search parameter
  const wpParams: any = {
    per_page: 100,
    _embed: true
  };

  // WordPress REST API uses 'search' parameter for text search
  if (searchParams.search_term) {
    wpParams.search = searchParams.search_term;
  }

  // For now, we assume starts_with refers to handbook content
  // You can extend this to support other content types
  const endpoint = searchParams.starts_with === 'handbook' ? '/handbook' : '/pages';

  const results = await fetchFromWordPress<any[]>(endpoint, wpParams, options.fetch);

  // Normalize results to have Storyblok-like structure for compatibility
  return results.map(normalizeWordPressPost) as T[];
}

/**
 * Fetch awards/recognition
 */
export async function fetchAwards(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressRecognition[]> {
  return fetchFromWordPress<WordPressRecognition[]>(
    '/recognition',
    AWARDS_PARAMS,
    options.fetch
  );
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
 * Get related blog posts based on tags
 */
export async function getRelatedBlogPosts(
  postId: number,
  limit: number = 3
): Promise<WordPressBlogPost[]> {
  // Get recent posts excluding the current one
  const posts = await fetchBlogPosts({ per_page: limit + 10 });
  return posts.filter(post => post.id !== postId).slice(0, limit);
}

/**
 * Get related projects based on tags
 */
export async function getRelatedProjects(
  projectId: number,
  limit: number = 3
): Promise<WordPressProject[]> {
  const projects = await fetchProjects({ per_page: limit + 10 });
  return projects.filter(project => project.id !== projectId).slice(0, limit);
}

/**
 * Fetch blog posts for homepage (compatibility function)
 */
export async function fetchHomeBlogPosts(
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
): Promise<WordPressBlogPost[]> {
  return fetchBlogPosts({ per_page: 3, fetch: options.fetch });
}

/**
 * Helper function to get image URL from WordPress media
 */
export function getImageUrl(media: any, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'full'): string {
  if (!media) return '';

  // If it's an ACF image object
  if (media.sizes && media.sizes[size]) {
    return media.sizes[size];
  }

  // If it's an ACF image with url
  if (media.url) {
    return media.url;
  }

  // If it's embedded media
  if (media.source_url) {
    return media.source_url;
  }

  return '';
}

/**
 * Helper to get featured image URL
 */
export function getFeaturedImageUrl(post: any, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'full'): string {
  // Check embedded media
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];

    if (media.media_details?.sizes?.[size]) {
      return media.media_details.sizes[size].source_url;
    }

    return media.source_url || '';
  }

  // Check ACF featured image
  if (post.acf?.featured_image) {
    return getImageUrl(post.acf.featured_image, size);
  }

  return '';
}

/**
 * Helper to extract plain text from HTML
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Helper to determine content component/type
 */
export function getContentComponent(post: any): string {
  // Map WordPress post types to component names
  const typeMap: Record<string, string> = {
    'page': 'page',
    'post': 'blog-post',
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

/**
 * PageResult type for compatibility
 */
export type PageResult = {
  story: any;
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
    fetch?: typeof fetch;
  } = {}
): Promise<PageResult> {
  const result: PageResult = {
    story: normalizeWordPressPost(story)
  };

  // Build index data
  const index: any = {};

  if (options.includePosts) {
    index.posts = await fetchBlogPosts({ per_page: 10, fetch: options.fetch });
  }

  if (options.includeProjects) {
    index.projects = await fetchProjects({ per_page: 50, fetch: options.fetch });
  }

  if (options.includeTeam) {
    index.team = await fetchTeamMembers({ fetch: options.fetch });
  }

  if (options.includeCareers) {
    index.careers = await fetchCareers({ fetch: options.fetch });
  }

  if (options.includeHandbook) {
    index.handbook = await fetchHandbookPages({ fetch: options.fetch });
  }

  if (Object.keys(index).length > 0) {
    result.index = index;
  }

  // Build related data
  if (options.includeRelated && story.id) {
    const related: any = {};

    if (story.type === 'post' || story.type === 'blog_post') {
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
