<script lang="ts" context="module">
  import type {
    BlogPostStoryblok,
    HandbookStoryblok,
    PageStoryblok,
    ProjectStoryblok,
    TeamMemberStoryblok
  } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export type PageStories = ISbStoryData<
    PageStoryblok | BlogPostStoryblok | HandbookStoryblok | ProjectStoryblok | TeamMemberStoryblok
  >;

  export const isPage = (story: PageStories): story is ISbStoryData<PageStoryblok> => {
    return story.content.component === 'page';
  };

  export const isBlogPost = (story: PageStories): story is ISbStoryData<BlogPostStoryblok> => {
    return story.content.component === 'blog-post';
  };

  export const isHandbook = (story: PageStories): story is ISbStoryData<HandbookStoryblok> => {
    return story.content.component === 'handbook';
  };

  export const isProject = (story: PageStories): story is ISbStoryData<ProjectStoryblok> => {
    return story.content.component === 'project';
  };

  export const isTeamMember = (story: PageStories): story is ISbStoryData<TeamMemberStoryblok> => {
    return story.content.component === 'team-member';
  };
</script>

<script lang="ts">
  import BlogPost from './blog-post.svelte';
  import Handbook from './handbook.svelte';
  import Page from './page.svelte';
  import Project from './project.svelte';
  import TeamMember from './team-member.svelte';

  export let story: PageStories;
</script>

{#if isPage(story)}
  <Page {story} />
{:else if isBlogPost(story)}
  <BlogPost {story} />
{:else if isHandbook(story)}
  <Handbook {story} />
{:else if isProject(story)}
  <Project {story} />
{:else if isTeamMember(story)}
  <TeamMember {story} />
{/if}
