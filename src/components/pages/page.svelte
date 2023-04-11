<script lang="ts">
  import type { GetAQuotePageStoryblok, HomePageStoryblok, PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import GetAQuote from './get-a-quote.svelte';
  import BlogIndex from './blog-index.svelte';
  import type { PageResult } from '$lib/content';
  import ProjectsIndex from './projects-index.svelte';
  import HomePage from './home-page.svelte';
  import StaticPage from './static-page.svelte';

  /**
   * This is the "Page" content-type that is used to render all of the "static content" pages.
   * It has a "page" field that will contain one specific page type (e.g. "static-page", "home-page", etc.)
   */
  export let story: ISbStoryData<PageStoryblok>;
  export let homePosts: PageResult['homePosts'] = undefined;
  export let blogIndex: PageResult['blogIndex'] = undefined;
  export let projectsIndex: PageResult['projectsIndex'] = undefined;

  const isGetAQuotePage = (page: { component: string }): page is GetAQuotePageStoryblok => {
    return page.component === 'get-a-quote-page';
  };

  const isHomePage = (page: { component: string }): page is HomePageStoryblok => {
    return page.component === 'home-page';
  };
</script>

{#each story.content.page || [] as page}
  {#if page.component === 'static-page'}
    <StaticPage body={page.body} />
  {:else if page.component === 'home-page' && isHomePage(page)}
    <HomePage data={page} posts={homePosts} />
  {:else if page.component === 'about-page'}
    <div>About page</div>
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
