<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import Slogan from '$components/slogan.svelte';
  import { richTextBlockWidths } from '$lib/constants';
  import type { PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let story: ISbStoryData<PageStoryblok>;
</script>

{#each story.content.page || [] as page}
  {#if page.component === 'static-page'}
    <div class="container">
      <RichText
        class="my-10 md:my-14 lg:my-20"
        doc={page.body}
        getAttributes={(_, block) => ({
          class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
        })}
      />
    </div>
  {:else if page.component === 'home-page'}
    <div class="container mt-20"><Slogan as="h2" class="text-7xl font-bold" /></div>
    <div class="py-96" />
    <div class="py-96" />
    <div class="py-96" />
  {:else if page.component === 'about-page'}
    <div>About page</div>
  {:else if page.component === 'get-a-quote-page'}
    <div>Get a quote page</div>
  {:else if page.component === 'contacts-page'}
    <div>Contacts page</div>
  {/if}
{/each}
