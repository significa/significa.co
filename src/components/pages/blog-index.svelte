<script lang="ts">
  import { page } from '$app/stores';
  import BlogEntry from '$components/blog-entry.svelte';
  import Seo from '$components/seo.svelte';
  import { BLOG_PARAMS } from '$lib/content';
  import { t } from '$lib/i18n';
  import { getStoryblok } from '$lib/storyblok';
  import type { BlogPostStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import type { ISbResult, ISbStoryData } from '@storyblok/js';
  import { writable } from 'svelte/store';

  export let data: ISbResult;

  const storyblok = getStoryblok();
  const isFetching = writable(false);
  const total = writable(data.total);
  const posts = writable<ISbStoryData<BlogPostStoryblok>[]>([]);

  // sync load function with local store (that will store "load more" posts)
  $: posts.set(data.data.stories);
  $: total.set(data.total);
  $: version = $page.data.version || 'published';
  $: tags = $page.url.searchParams.getAll('t');

  const fetchStories = async (page: number) => {
    isFetching.set(true);
    const res = await storyblok.get('cdn/stories', {
      version,
      with_tag: tags.join(','),
      page,
      ...BLOG_PARAMS
    });
    isFetching.set(false);

    posts.update((n) => [...n, ...res.data.stories]);
    total.set(res.total);
  };

  const getPageTitle = (tags: string[]): string => {
    if (tags.length === 0) {
      return $page.data.page?.story?.content?.seo_title;
    }

    const titlePrefix = ($page.data.page?.story?.content?.seo_title || '').replace(
      /\s[-–]\s.*/,
      ''
    );

    return `${titlePrefix} - ${tags.join(', ')}`;
  };
</script>

<Seo
  title={getPageTitle(tags)}
  description={tags.length
    ? t('blog.tag-meta-description', { tags: tags.join(', ') })
    : $page.data.page?.story?.content?.seo_description}
  structureDataMarkup={$page.data.page?.story?.content?.structure_data_markup}
/>

<main>
  <div class="container mx-auto px-container">
    <h1 class="mt-10 text-7xl md:mt-14 lg:mt-20">
      {#if tags.length}
        <a class="text-foreground-tertiary transition-colors hover:text-foreground" href="/blog"
          >{t('blog.title')}</a
        >
        <span class="text-foreground-tertiary">/</span>
        <span>{tags.join(', ')}</span>
      {:else}
        <span>{t('blog.title')}</span>
      {/if}
    </h1>
  </div>

  <div class="mt-10 md:mt-14 lg:mt-20">
    {#each $posts as post}
      <BlogEntry {post} />
    {/each}
  </div>

  <div class="container mx-auto mb-10 px-container">
    {#if $posts.length < $total}
      <Button
        class="mt-10"
        variant="secondary"
        on:click={() => {
          fetchStories($posts.length / BLOG_PARAMS.per_page + 1);
        }}
        loading={$isFetching}
      >
        {t('blog.load-more')}
      </Button>
    {/if}

    {#if $posts.length === 0}
      <p class="text-5xl">{t('blog.no-results')}</p>
    {/if}
  </div>
</main>
