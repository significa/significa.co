<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import Slogan from '$components/slogan.svelte';
  import { richTextBlockWidths } from '$lib/constants';
  import type { GetAQuotePageStoryblok, PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import GetAQuote from './get-a-quote/get-a-quote.svelte';

  export let story: ISbStoryData<PageStoryblok>;

  const isGetAQuotePage = (page: any): page is GetAQuotePageStoryblok => {
    return page.component === 'get-a-quote-page';
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
  {:else if page.component === 'about-page'}
    <div>About page</div>
  {:else if page.component === 'get-a-quote-page' && isGetAQuotePage(page)}
    <GetAQuote {page} />
  {:else if page.component === 'contacts-page'}
    <div>Contacts page</div>
  {/if}
{/each}
