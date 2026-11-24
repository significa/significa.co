<script lang="ts">
  import Heading from '$components/heading.svelte';
  import BlogEntry from '$components/blog-entry.svelte';
  import type { BlogListStoryblok } from '$types/bloks';
  import { page } from '$app/stores';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: BlogListStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto px-container">
    <Heading offset={0} visual={2} class="text-5xl text-foreground-secondary"
      >{block.title1}</Heading
    >
    <p class="text-5xl">{block.title2}</p>
  </div>
  <div class="mt-4 md:mt-6 lg:mt-8">
    {#each (block?.blog_posts?.length ? block.blog_posts : $page.data.homePosts) || [] as post}
      <BlogEntry {post} />
    {/each}
  </div>
</section>
