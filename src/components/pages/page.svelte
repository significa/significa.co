<script lang="ts">
  import type {
    CareersPageStoryblok,
    HomePageStoryblok,
    AboutPageStoryblok,
    GetAQuotePageStoryblok,
    PageStoryblok,
    ContactsPageStoryblok,
    ServicesPageStoryblok
  } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import GetAQuote from './get-a-quote.svelte';
  import BlogIndex from './blog-index.svelte';
  import type { PageResult } from '$lib/content';
  import ProjectsIndex from './projects-index.svelte';
  import About from './about.svelte';
  import HomePage from './home-page.svelte';
  import StaticPage from './static-page.svelte';
  import Careers from './careers.svelte';
  import Contact from './contact.svelte';
  import Services from './services.svelte';

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

  const isHomePage = (page: { component: string }): page is HomePageStoryblok => {
    return page.component === 'home-page';
  };

  const isCareersPage = (page: { component: string }): page is CareersPageStoryblok => {
    return page.component === 'careers-page';
  };

  const isContactPage = (page: { component: string }): page is ContactsPageStoryblok => {
    return page.component === 'contacts-page';
  };

  const isServicesPage = (page: { component: string }): page is ServicesPageStoryblok => {
    return page.component === 'services-page';
  };
</script>

{#each story.content.page || [] as page}
  {#if page.component === 'static-page' && page.body}
    <StaticPage body={page.body} />
  {:else if page.component === 'about-page' && isAboutPage(page)}
    <About blocks={story.content.blocks} />
  {:else if page.component === 'home-page' && isHomePage(page)}
    <HomePage blocks={story.content.blocks} />
  {:else if page.component === 'blog-index' && blogIndex}
    <BlogIndex data={blogIndex} />
  {:else if page.component === 'projects-index' && projectsIndex}
    <ProjectsIndex projects={projectsIndex} />
  {:else if page.component === 'get-a-quote-page' && isGetAQuotePage(page)}
    <GetAQuote blocks={story.content.blocks} />
  {:else if page.component === 'careers-page' && isCareersPage(page)}
    <Careers blocks={story.content.blocks} />
  {:else if page.component === 'contacts-page' && isContactPage(page)}
    <Contact blocks={story.content.blocks} />
  {:else if page.component === 'services-page' && isServicesPage(page)}
    <Services blocks={story.content.blocks} />
  {/if}
{/each}
