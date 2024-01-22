<script lang="ts">
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';
  import Seo from '$components/seo.svelte';
  import type {
    PageResult,
    Page,
    BlogPostPage,
    HandbookPage,
    ProjectPage,
    CareerPage,
    TeamMemberPage,
    LandingPage
  } from '$lib/content';
  import BlogPost from './blog-post.svelte';
  import Career from './career.svelte';
  import Handbook from './handbook.svelte';
  import PageComponent from './page.svelte';
  import Project from './project.svelte';
  import TeamMember from './team-member.svelte';

  /**
   * The dynamic page will render the correct page based on the content type (page, blog-post, etc.)
   */
  export let page: PageResult;

  type PageType = { story: Page } & Pick<
    PageResult,
    'blogIndex' | 'projectsIndex' | 'homePosts' | 'teamMembers'
  >;
  const isPage = (page: PageResult): page is PageType => {
    return page.story.content.component === 'page';
  };

  const isBlogPostPage = (
    page: PageResult
  ): page is { story: BlogPostPage; relatedPosts: BlogPostPage[] } => {
    return page.story.content.component === 'blog-post';
  };

  const isHandbookPage = (page: PageResult): page is { story: HandbookPage } => {
    return page.story.content.component === 'handbook';
  };

  const isProjectPage = (
    page: PageResult
  ): page is { story: ProjectPage; relatedProjects: ProjectPage[] } => {
    return page.story.content.component === 'project';
  };

  const isCareerPage = (page: PageResult): page is { story: CareerPage } => {
    return page.story.content.component === 'career';
  };

  const isTeamMemberPage = (
    page: PageResult
  ): page is {
    story: TeamMemberPage;
    authorPosts: BlogPostPage[];
    authorProjects: ProjectPage[];
  } => {
    return page.story.content.component === 'team-member';
  };

  const isLandingPage = (page: PageResult): page is { story: LandingPage } => {
    return page.story.content.component === 'landing-page';
  };
</script>

{#if isPage(page)}
  <PageComponent
    story={page.story}
    blogIndex={page.blogIndex}
    projectsIndex={page.projectsIndex}
    homePosts={page.homePosts}
    teamMembers={page.teamMembers}
  />
{:else if isBlogPostPage(page)}
  <BlogPost story={page.story} related={page.relatedPosts} />
{:else if isHandbookPage(page)}
  <Handbook story={page.story} />
{:else if isProjectPage(page)}
  <Project story={page.story} related={page.relatedProjects} />
{:else if isTeamMemberPage(page)}
  <TeamMember story={page.story} posts={page.authorPosts} projects={page.authorProjects} />
{:else if isCareerPage(page)}
  <Career story={page.story} />
{:else if isLandingPage(page) && page.story.content.blocks?.length}
  <Seo />
  {#each page.story.content.blocks as block}
    <DynamicBlock {block} />
  {/each}
{/if}
