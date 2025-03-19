<script lang="ts">
  import BlogEntry from '$components/blog-entry.svelte';
  import type { BlogListStoryblok } from '$types/bloks';
  import { page } from '$app/stores';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: BlogListStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto px-container">
    <h2 class="text-5xl text-foreground-secondary">{block.title1}</h2>
    <p class="text-5xl">{block.title2}</p>
  </div>
  <div class="mt-4 md:mt-6 lg:mt-8">
    {#each $page.data.homePosts || [] as post}
      <BlogEntry {post} />
    {/each}
  </div>
</section>
