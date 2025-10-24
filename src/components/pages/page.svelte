<script lang="ts">
  import type { WordPressPage } from '$lib/types/wordpress';
  import BlogIndex from './blog-index.svelte';
  import type { PageResult } from '$lib/content';
  import ProjectsIndex from './projects-index.svelte';
  import StaticPage from './static-page.svelte';
  import Seo from '$components/seo.svelte';
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  /**
   * WordPress page component
   * Renders content blocks from ACF flexible content fields
   */
  export let story: WordPressPage;
  export let blogIndex: PageResult['blogIndex'] = undefined;
  export let projectsIndex: PageResult['projectsIndex'] = undefined;

  // Extract content blocks from ACF
  $: contentBlocks = story.acf?.content_blocks || [];
  $: pageType = story.acf?.page_type || 'default';
</script>

{#if contentBlocks.length}
  <Seo />
  {#each contentBlocks as block}
    <DynamicBlock {block} />
  {/each}
{:else if pageType === 'static-page'}
  <StaticPage body={story.content?.rendered || ''} />
{:else if pageType === 'blog-index' && blogIndex}
  <BlogIndex data={blogIndex} />
{:else if pageType === 'projects-index' && projectsIndex}
  <ProjectsIndex projects={projectsIndex} />
{/if}
