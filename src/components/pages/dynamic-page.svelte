<script lang="ts">
  import {
    isBlogPostPage,
    isHandbookPage,
    isCareerPage,
    isPage,
    isProjectPage,
    isTeamMemberPage,
    type PageResult
  } from '$lib/storyblok';
  import BlogPost from './blog-post.svelte';
  import Career from './career.svelte';
  import Handbook from './handbook.svelte';
  import Page from './page.svelte';
  import Project from './project.svelte';
  import TeamMember from './team-member.svelte';

  export let page: PageResult;
</script>

{#if isPage(page)}
  <Page story={page.story} />
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
{/if}
