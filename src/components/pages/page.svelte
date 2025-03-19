<script lang="ts">
  import type { PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import BlogIndex from './blog-index.svelte';
  import type { PageResult } from '$lib/content';
  import ProjectsIndex from './projects-index.svelte';
  import StaticPage from './static-page.svelte';
  import Seo from '$components/seo.svelte';
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  /**
   * This is the "Page" content-type that is used to render all of the "static content" pages.
   * It has a "page" field that will contain one specific page type (e.g. "static-page", "home-page", etc.)
   */
  export let story: ISbStoryData<PageStoryblok>;
  export let blogIndex: PageResult['blogIndex'] = undefined;
  export let projectsIndex: PageResult['projectsIndex'] = undefined;
</script>

{#if story.content.blocks?.length}
  <Seo structureDataMarkup={story.content.structure_data_markup} />
  {#each story.content.blocks as block}
    <DynamicBlock {block} />
  {/each}
{:else if story.content.page?.length}
  {#each story.content.page || [] as page}
    {#if page.component === 'static-page' && page.body}
      <StaticPage body={page.body} />
    {:else if page.component === 'blog-index' && blogIndex}
      <BlogIndex data={blogIndex} />
    {:else if page.component === 'projects-index' && projectsIndex}
      <ProjectsIndex projects={projectsIndex} />
    {/if}
  {/each}
{/if}
