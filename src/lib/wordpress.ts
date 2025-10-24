/**
 * WordPress REST API Client
 *
 * This module handles all communication with the WordPress REST API
 * and replaces the Storyblok integration.
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

const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2';

/**
 * Generic fetch function for WordPress REST API
 */
async function fetchFromWordPress<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`);

  // Add default params
  const defaultParams = {
    _embed: 'true', // Include embedded data (featured images, authors, etc.)
    per_page: 100,
  };

  const allParams = { ...defaultParams, ...params };

  Object.entries(allParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
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
export async function fetchPage(slug: string): Promise<WordPressPage> {
  const pages = await fetchFromWordPress<WordPressPage[]>('/pages', { slug });

  if (!pages || pages.length === 0) {
    throw new Error(`Page not found: ${slug}`);
  }

  return pages[0];
}

/**
 * Fetch all pages
 */
export async function fetchPages(params?: { per_page?: number }): Promise<WordPressPage[]> {
  return fetchFromWordPress<WordPressPage[]>('/pages', params);
}

/**
 * Fetch blog posts with filtering and pagination
 */
export async function fetchBlogPosts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  tag?: string;
  exclude_hidden?: boolean;
}): Promise<WordPressBlogPost[]> {
  const posts = await fetchFromWordPress<WordPressBlogPost[]>('/blog_post', {
    per_page: params?.per_page || 10,
    page: params?.page || 1,
    orderby: 'date',
    order: 'desc',
    ...params
  });

  // Filter out posts with hide_from_listings if requested
  if (params?.exclude_hidden) {
    return posts.filter(post => !post.acf?.hide_from_listings);
  }

  return posts;
}

/**
 * Fetch single blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<WordPressBlogPost> {
  const posts = await fetchFromWordPress<WordPressBlogPost[]>('/blog_post', { slug });

  if (!posts || posts.length === 0) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return posts[0];
}

/**
 * Fetch all projects
 */
export async function fetchProjects(params?: {
  per_page?: number;
  exclude_hidden?: boolean;
}): Promise<WordPressProject[]> {
  const projects = await fetchFromWordPress<WordPressProject[]>('/project', {
    per_page: params?.per_page || 50,
    orderby: 'date',
    order: 'desc'
  });

  if (params?.exclude_hidden) {
    return projects.filter(project => !project.acf?.hide_from_listings);
  }

  return projects;
}

/**
 * Fetch single project by slug
 */
export async function fetchProject(slug: string): Promise<WordPressProject> {
  const projects = await fetchFromWordPress<WordPressProject[]>('/project', { slug });

  if (!projects || projects.length === 0) {
    throw new Error(`Project not found: ${slug}`);
  }

  return projects[0];
}

/**
 * Fetch all team members
 */
export async function fetchTeamMembers(params?: {
  active_only?: boolean;
}): Promise<WordPressTeamMember[]> {
  const members = await fetchFromWordPress<WordPressTeamMember[]>('/team_member', {
    per_page: 100,
    orderby: 'menu_order',
    order: 'asc'
  });

  if (params?.active_only) {
    return members.filter(member => member.acf?.is_active !== false);
  }

  return members;
}

/**
 * Fetch single team member by slug
 */
export async function fetchTeamMember(slug: string): Promise<WordPressTeamMember> {
  const members = await fetchFromWordPress<WordPressTeamMember[]>('/team_member', { slug });

  if (!members || members.length === 0) {
    throw new Error(`Team member not found: ${slug}`);
  }

  return members[0];
}

/**
 * Fetch all careers/job openings
 */
export async function fetchCareers(params?: {
  active_only?: boolean;
}): Promise<WordPressCareer[]> {
  const careers = await fetchFromWordPress<WordPressCareer[]>('/career', {
    per_page: 50,
    orderby: 'date',
    order: 'desc'
  });

  if (params?.active_only) {
    return careers.filter(career => career.acf?.is_active !== false);
  }

  return careers;
}

/**
 * Fetch single career by slug
 */
export async function fetchCareer(slug: string): Promise<WordPressCareer> {
  const careers = await fetchFromWordPress<WordPressCareer[]>('/career', { slug });

  if (!careers || careers.length === 0) {
    throw new Error(`Career not found: ${slug}`);
  }

  return careers[0];
}

/**
 * Fetch handbook pages
 */
export async function fetchHandbookPages(): Promise<WordPressHandbook[]> {
  return fetchFromWordPress<WordPressHandbook[]>('/handbook', {
    per_page: 100,
    orderby: 'menu_order',
    order: 'asc'
  });
}

/**
 * Fetch single handbook page by slug
 */
export async function fetchHandbookPage(slug: string): Promise<WordPressHandbook> {
  const pages = await fetchFromWordPress<WordPressHandbook[]>('/handbook', { slug });

  if (!pages || pages.length === 0) {
    throw new Error(`Handbook page not found: ${slug}`);
  }

  return pages[0];
}

/**
 * Fetch awards/recognition
 */
export async function fetchAwards(): Promise<WordPressRecognition[]> {
  return fetchFromWordPress<WordPressRecognition[]>('/recognition', {
    per_page: 100,
    orderby: 'date',
    order: 'desc'
  });
}

/**
 * Get related blog posts based on tags
 */
export async function getRelatedBlogPosts(
  postId: number,
  limit: number = 3
): Promise<WordPressBlogPost[]> {
  // This would need a custom WordPress endpoint or client-side filtering
  // For now, just return recent posts excluding the current one
  const posts = await fetchBlogPosts({ per_page: limit + 1 });
  return posts.filter(post => post.id !== postId).slice(0, limit);
}

/**
 * Get related projects based on tags
 */
export async function getRelatedProjects(
  projectId: number,
  limit: number = 3
): Promise<WordPressProject[]> {
  // Similar to related posts
  const projects = await fetchProjects({ per_page: limit + 1 });
  return projects.filter(project => project.id !== projectId).slice(0, limit);
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
