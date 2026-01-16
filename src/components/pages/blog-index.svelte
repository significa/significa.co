<script lang="ts">
  import { page } from '$app/stores';
  import BlogEntry from '$components/blog-entry.svelte';
  import Seo from '$components/seo.svelte';
  import { BLOG_PARAMS, fetchBlogPosts } from '$lib/content';
  import { t } from '$lib/i18n';
  import type { WordPressBlogPost } from '$lib/types/wordpress';
  import { Badge, Button, Tag, TextButton } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';

  export let data: {
    posts: WordPressBlogPost[];
    total: number;
  };

  const isFetching = writable(false);
  const total = writable(data.total || data.posts.length);
  const posts = writable<WordPressBlogPost[]>(data.posts || []);

  let allTags: string[] = [];
  let filters: string[] = [];
  let filtersOpen: boolean;

  // sync load function with local store
  $: posts.set(data.posts);
  $: total.set(data.total || data.posts.length);
  $: paramsTags = $page.url.searchParams.getAll('t');

  const fetchMorePosts = async (pageNum: number) => {
    isFetching.set(true);
    try {
      const newPosts = await fetchBlogPosts({
        page: pageNum,
        per_page: BLOG_PARAMS.per_page
      });

      if (pageNum === 1) {
        posts.set(newPosts);
      } else {
        posts.update((n) => [...n, ...newPosts]);
      }

      // WordPress doesn't always return total, so estimate based on response
      if (newPosts.length < BLOG_PARAMS.per_page) {
        total.set($posts.length);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      isFetching.set(false);
    }
  };

  const getPageTitle = (tags: string[]): string => {
    if (tags.length === 0) {
      return $page.data.page?.story?.content?.seo_title || t('blog.title');
    }

    const titlePrefix = ($page.data.page?.story?.content?.seo_title || t('blog.title')).replace(
      /\s[-–]\s.*/,
      ''
    );

    return `${titlePrefix} - ${tags.join(', ')}`;
  };

  // Note: WordPress doesn't have built-in tags API like Storyblok
  // Tags would need to be fetched from WordPress taxonomies
  // For now, we'll extract tags from the posts themselves
  $: {
    if ($posts.length > 0) {
      const tagSet = new Set<string>();
      $posts.forEach(post => {
        // If your WordPress posts have tags in the response
        if (post._embedded?.['wp:term']) {
          const terms = post._embedded['wp:term'];
          terms.forEach((termArray: any[]) => {
            termArray.forEach((term: any) => {
              if (term.taxonomy === 'post_tag') {
                tagSet.add(term.name);
              }
            });
          });
        }
      });
      allTags = Array.from(tagSet);
    }
  }
</script>

<Seo
  title={getPageTitle(paramsTags)}
  description={paramsTags.length
    ? t('blog.tag-meta-description', { tags: paramsTags.join(', ') })
    : $page.data.page?.story?.content?.seo_description || ''}
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

                        fetchMorePosts(1);
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
          fetchMorePosts(Math.floor($posts.length / BLOG_PARAMS.per_page) + 1);
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
