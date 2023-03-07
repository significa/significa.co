<script lang="ts">
  import RichText from '$components/rich-text.svelte';
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
    <div>Home page</div>
  {:else if page.component === 'about-page'}
    <div>About page</div>
  {:else if page.component === 'get-a-quote-page'}
    <div>Get a quote page</div>
  {:else if page.component === 'contacts-page'}
    <div>Contacts page</div>
  {/if}
{/each}
