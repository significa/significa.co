<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import Slogan from '$components/slogan.svelte';
  import { richTextBlockWidths } from '$lib/constants';
  import type { AboutPageStoryblok, GetAQuotePageStoryblok, PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import GetAQuote from './get-a-quote/get-a-quote.svelte';
  import BlogIndex from './blog-index.svelte';
  import type { PageResult } from '$lib/content';
  import ProjectsIndex from './projects-index.svelte';
  import About from './about.svelte';

  /**
   * This is the "Page" content-type that is used to render all of the "static content" pages.
   * It has a "page" field that will contain one specific page type (e.g. "static-page", "home-page", etc.)
   */
  export let story: ISbStoryData<PageStoryblok>;
  export let blogIndex: PageResult['blogIndex'] = undefined;
  export let projectsIndex: PageResult['projectsIndex'] = undefined;

  const isGetAQuotePage = (page: { component: string }): page is GetAQuotePageStoryblok => {
    return page.component === 'get-a-quote-page';
  };

  const isAboutPage = (page: { component: string }): page is AboutPageStoryblok => {
    return page.component === 'about-page';
  };
</script>

{#each story.content.page || [] as page}
  {#if page.component === 'static-page'}
    <div class="container mx-auto px-container">
      <RichText
        class="my-10 md:my-14 lg:my-20"
        doc={page.body}
        getAttributes={(_, block) => ({
          class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
        })}
      />
    </div>
  {:else if page.component === 'home-page'}
    <div class="container mx-auto mt-20 px-container">
      <Slogan as="h2" class="text-7xl font-bold" />
    </div>
    <div class="py-96" />
    <div class="py-96" />
    <div class="py-96" />
  {:else if page.component === 'about-page' && isAboutPage(page)}
    <About data={page} />
  {:else if page.component === 'blog-index' && blogIndex}
    <BlogIndex data={blogIndex} />
  {:else if page.component === 'projects-index' && projectsIndex}
    <ProjectsIndex projects={projectsIndex} />
  {:else if page.component === 'get-a-quote-page' && isGetAQuotePage(page)}
    <GetAQuote {page} />
  {:else if page.component === 'contacts-page'}
    <div>Contacts page</div>
  {/if}
{/each}
