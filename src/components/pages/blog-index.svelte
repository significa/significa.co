<script lang="ts">
  import { page } from '$app/stores';
  import BlogEntry from '$components/blog-entry.svelte';
  import Seo from '$components/seo.svelte';
  import { BLOG_PARAMS } from '$lib/content';
  import { t } from '$lib/i18n';
  import { getStoryblok } from '$lib/storyblok';
  import type { BlogPostStoryblok } from '$types/bloks';
  import { Badge, Button, Tag, TextButton } from '@significa/svelte-ui';
  import type { ISbResult, ISbStoryData } from '@storyblok/js';
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';

  export let data: ISbResult;

  const storyblok = getStoryblok();
  const isFetching = writable(false);
  const total = writable(data.total);
  const posts = writable<ISbStoryData<BlogPostStoryblok>[]>([]);

  let allTags: string[] = [];
  let filters: string[] = [];
  let filtersOpen: boolean;

  // sync load function with local store (that will store "load more" posts)
  $: posts.set(data.data.stories);
  $: total.set(data.total);
  $: version = $page.data.version || 'published';
  $: paramsTags = $page.url.searchParams.getAll('t');

  const fetchStories = async (page: number) => {
    isFetching.set(true);
    const queryTags = paramsTags.length > 0 ? paramsTags.join(',') : filters.join(',');
    const res = await storyblok.get('cdn/stories', {
      version,
      with_tag: queryTags,
      page,
      ...BLOG_PARAMS
    });
    isFetching.set(false);

    if (page === 1) {
      posts.set(res.data.stories);
    } else {
      posts.update((n) => [...n, ...res.data.stories]);
    }

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

  onMount(async () => {
    const blogTags = await storyblok.get('cdn/tags', {
      version,
      cv: Date.now(),
      starts_with: 'blog/',
      per_page: 100
    });

    allTags = blogTags.data.tags.map((tag: { name: string }) => tag.name);
  });
</script>

<Seo
  title={getPageTitle(paramsTags)}
  description={paramsTags.length
    ? t('blog.tag-meta-description', { tags: paramsTags.join(', ') })
    : $page.data.page?.story?.content?.seo_description}
  structureDataMarkup={$page.data.page?.story?.content?.structure_data_markup}
/>

<main>
  <div class="container mx-auto px-container">
    <h1 class="mt-10 text-7xl md:mt-14 lg:mt-20">
      {#if paramsTags.length}
        <a class="text-foreground-tertiary transition-colors hover:text-foreground" href="/blog"
          >{t('blog.title')}</a
        >
        <span class="text-foreground-tertiary">/</span>
        <span>{paramsTags.join(', ')}</span>
      {:else}
        <span>{t('blog.title')}</span>
      {/if}
    </h1>
  </div>

  <div class="mt-10 md:mt-14 lg:mt-20">
    {#if paramsTags.length == 0}
      <!-- Filters -->
      <div
        class="lg:mt-18 container mx-auto mb-3 mt-8 flex items-center justify-between px-container md:mt-12"
      >
        <div class="flex items-center gap-2">
          <TextButton iconLeft="configuration" on:click={() => (filtersOpen = !filtersOpen)}
            >{t(filtersOpen ? 'close' : 'filters')}</TextButton
          >
          {#if filters.length}
            <Badge>{filters.length}</Badge>
          {/if}
        </div>
        {#if filters.length}
          <TextButton on:click={() => (filters = [])}>{t('clear-all')}</TextButton>
        {/if}
      </div>
      <div class="border-t">
        {#if filtersOpen}
          <div transition:slide|local={{ duration: 300 }} class="border-b">
            <div class="container mx-auto px-container py-4 md:flex md:py-0">
              <div class={clsx('py-4 md:py-10')}>
                <div class="mt-2 flex flex-wrap gap-2">
                  {#each allTags as tag}
                    <Tag
                      label={tag}
                      active={filters.some((f) => f === tag)}
                      on:click={() => {
                        const rest = filters.filter((f) => f !== tag);

                        if (filters.some((f) => f === tag)) {
                          filters = rest;
                        } else {
                          filters = [...rest, tag];
                        }

                        fetchStories(1);
                      }}
                    />
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}

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
      <p class="py-8 text-5xl">{t('blog.no-results')}</p>
    {/if}
  </div>
</main>
