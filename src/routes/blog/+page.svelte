<script lang="ts">
  import { page } from '$app/stores';
  import BlogEntry from '$components/blog-entry.svelte';
  import { BLOG_PARAMS, getStoryblok } from '$lib/storyblok';
  import type { BlogPostStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import { writable } from 'svelte/store';
  import type { PageData } from './$types';

  export let data: PageData;

  const storyblok = getStoryblok();
  const isFetching = writable(false);
  const total = writable(data.total);
  const posts = writable<ISbStoryData<BlogPostStoryblok>[]>([]);

  // sync load function with local store (that will store "load more" posts)
  $: posts.set(data.data.stories);

  const fetchStories = async (page: number) => {
    isFetching.set(true);
    const res = await storyblok.get('cdn/stories', {
      version: $page.data.version || 'published',
      with_tag: $page.url.searchParams.getAll('t').join(','),
      page,
      ...BLOG_PARAMS
    });
    isFetching.set(false);

    posts.update((n) => [...n, ...res.data.stories]);
    total.set(res.total);
  };
</script>

<main class="container">
  <h1 class="my-10 text-8xl md:my-14 lg:my-20">
    {#if $page.url.searchParams.getAll('t').length}
      <span class="text-foreground-tertiary">{$page.url.searchParams.getAll('t').join(', ')}</span
      ><br />
    {/if}
    <span>Blog</span>
  </h1>

  <div>
    {#each $posts as post}
      <BlogEntry {post} />
    {/each}
  </div>

  {#if $posts.length < $total}
    <Button
      class="mt-10"
      variant="secondary"
      on:click={() => fetchStories($posts.length / BLOG_PARAMS.per_page + 1)}
      loading={$isFetching}
    >
      Load more
    </Button>
  {/if}

  {#if $posts.length === 0}
    <p>No posts found</p>
  {/if}
</main>
