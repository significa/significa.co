import type { ISbResult, ISbStoriesParams, ISbStoryData } from '@storyblok/js';
import { getStoryblok } from '$lib/storyblok';
import type {
  BlogPostStoryblok,
  HandbookStoryblok,
  CareerStoryblok,
  PageStoryblok,
  ProjectStoryblok,
  TeamMemberStoryblok,
  LandingPageStoryblok
} from '$types/bloks';
import { HOME_SLUG } from './constants';

export const PAGE_PARAMS = {
  resolve_links: 'url',
  resolve_relations:
    'blog-post.author,blog-post.project,project.team,home-page.small_highlights,home-page.projects,blog-post.authors,hero.small_highlights'
} as const;

export const BLOG_PARAMS = {
  per_page: 10,
  content_type: 'blog-post',
  sort_by: 'first_published_at:desc',
  resolve_relations: 'blog-post.author,blog-post.authors'
} as const;

export const PROJECT_PARAMS = {
  per_page: 50,
  content_type: 'project'
};

export const CAREERS_PARAMS = {
  per_page: 50,
  content_type: 'career'
};

export const TEAM_MEMBER_PARAMS = {
  per_page: 100,
  content_type: 'team-member'
};

export const fetchCareers = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const {
    data: { stories }
  } = await storyblok.get('cdn/stories', {
    ...CAREERS_PARAMS,
    version: options.version || 'published'
  });

  return stories as ISbStoryData<CareerStoryblok>[];
};

// blog posts use other data from the response, so we need to return the whole response
export const fetchBlogPosts = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch; url?: URL } = {}
) => {
  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  return storyblok.get('cdn/stories', {
    ...BLOG_PARAMS,
    with_tag: options.url?.searchParams.getAll('t').join(',') || '',
    page: 1,
    version: options.version || 'published'
  });
};

export const fetchProjects = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const res: { data: { stories: ISbStoryData<ProjectStoryblok>[] } } = await storyblok.get(
    'cdn/stories',
    {
      ...PROJECT_PARAMS,
      version: options.version || 'published'
    }
  );

  return res.data.stories;
};

// Dynamic Pages
export type Page = ISbStoryData<PageStoryblok>;
export type CareerPage = ISbStoryData<CareerStoryblok>;
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
export type LandingPage = ISbStoryData<LandingPageStoryblok>;

export type DynamicPage =
  | Page
  | BlogPostPage
  | HandbookPage
  | ProjectPage
  | TeamMemberPage
  | CareerPage
  | LandingPage;

export type PageResult = {
  story: DynamicPage;
  homePosts?: BlogPostPage[];
  blogIndex?: ISbResult;
  projectsIndex?: ISbStoryData<ProjectStoryblok>[];
  relatedPosts?: BlogPostPage[];
  relatedProjects?: ProjectPage[];
  authorPosts?: BlogPostPage[];
  authorProjects?: ProjectPage[];
  teamMembers?: TeamMemberPage[];
};

export async function fetchPage(options: {
  slug: string;
  version?: 'draft' | 'published';
  fetch?: typeof fetch;
  url?: URL;
}): Promise<PageResult> {
  // remove leading slashes. svelte-kit's path params start with no slash, but links will have a leading slash
  const slug = options.slug.replace(/^\/+/, '');

  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  try {
    // home is in '/', so '/home' should 404
    if (slug === HOME_SLUG) throw new Error();

    const { data }: { data: { story?: DynamicPage } } = await storyblok.get(
      `cdn/stories/${slug || HOME_SLUG}`,
      {
        version: options.version || 'published',
        ...PAGE_PARAMS
      }
    );

    // 404
    if (!data.story?.id) throw new Error();

    // Index pages (blog, projects) have their own route but they need to be able to be rendered in the drawer as well
    if (
      data.story.content.component === 'page' &&
      data.story.content.page?.[0].component === 'blog-index'
    ) {
      return {
        story: data.story,
        blogIndex: await fetchBlogPosts(options)
      };
    }

    if (
      data.story.content.component === 'page' &&
      data.story.content.page?.[0].component === 'projects-index'
    ) {
      return {
        story: data.story,
        projectsIndex: await fetchProjects(options)
      };
    }

    // home page data
    if (
      data.story.content.component === 'page' &&
      data.story.content.page?.[0].component === 'home-page'
    ) {
      return {
        story: data.story,
        homePosts: await fetchEntries<BlogPostPage>(options, {
          ...BLOG_PARAMS,
          per_page: 3,
          page: 1
        })
      };
    }

    // Blog posts need to fetch related posts
    if (data.story.content.component === 'blog-post') {
      return {
        story: data.story,
        relatedPosts: await fetchEntries<BlogPostPage>(options, {
          ...BLOG_PARAMS,
          per_page: 3,
          page: 1,
          excluding_ids: data.story.id.toString(),
          with_tag: data.story.tag_list.join(',')
        })
      };
    }

    // Projects need to fetch related projects
    if (data.story.content.component === 'project') {
      return {
        story: data.story,
        relatedProjects: await fetchEntries<ProjectPage>(options, PROJECT_PARAMS)
      };
    }

    // Team members need to fetch related posts and projects
    if (data.story.content.component === 'team-member') {
      return {
        story: data.story,
        authorPosts: await fetchEntries<BlogPostPage>(options, {
          ...BLOG_PARAMS,
          per_page: 50,
          page: 1,
          filter_query: {
            author: {
              in: data.story.uuid
            }
          }
        }),
        authorProjects: await fetchEntries<ProjectPage>(options, {
          ...PROJECT_PARAMS,
          filter_query: {
            team: {
              any_in_array: data.story.uuid
            }
          }
        })
      };
    }

    // Careers canvas needs access to team members in order to fill "Team" component
    if (
      data.story.content.component === 'page' &&
      data.story.content.page?.[0].component === 'careers-page'
    ) {
      return {
        story: data.story,
        teamMembers: await fetchEntries<TeamMemberPage>(options, {
          ...TEAM_MEMBER_PARAMS,
          per_page: 100,
          page: 1,
          filter_query: {
            is_active: {
              is: true
            }
          }
        })
      };
    }

    return { story: data.story };
  } catch (err) {
    console.error(err);
    throw new Error('Not found', { cause: err });
  }
}

async function fetchEntries<T>(
  options: {
    version?: 'draft' | 'published';
    fetch?: typeof fetch;
  },
  params: ISbStoriesParams
): Promise<T[]> {
  try {
    const storyblok = getStoryblok({ fetch: options.fetch || fetch });

    const {
      data: { stories }
    } = await storyblok.get('cdn/stories', {
      version: options.version || 'published',
      excluding_fields: 'body',
      ...params
    });

    return stories;
  } catch (error) {
    console.error(error);
    return [];
  }
}
