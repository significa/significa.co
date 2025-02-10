<script lang="ts">
  import HandbookIndexItem from './HandbookIndexItem.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import handbook from '$assets/handbook/handbook_illustration.svg';

  import Seo from '$components/seo.svelte';
  import handbookOG from '$assets/handbook/HandbookOG.jpg';

  import { structureDataMarkup } from './structure-data-markup';
  import type { HandbookLevelStoryblok } from '$types/bloks';
  import { Button, Input, Icon } from '@significa/svelte-ui';
  import { fetchEntries } from '$lib/content';
  import type { HandbookPage } from '$lib/content';
  import { onMount } from 'svelte';
  import clsx from 'clsx';
  import { createBreakpointMediaQueryStore } from '$lib/stores/media';

  export let hierarchy: HandbookLevelStoryblok[];

  let searchInputValue = '';
  let submittedTerm: string | null = null;
  let searchResults: HandbookPage[] = [];
  const desktop = createBreakpointMediaQueryStore('md');

  $: if (searchInputValue === '') {
    searchResults = [];
    submittedTerm = null;
  }

  onMount(() => {
    const urlSearchTerm = $page.url.searchParams.get('search');

    if (urlSearchTerm) {
      searchInputValue = urlSearchTerm;
      handleSearch();
    }
  });

  async function handleSearch() {
    const response = await fetchEntries<HandbookPage>(
      { version: $page.data.version || 'published' },
      { starts_with: 'handbook', search_term: searchInputValue }
    );

    searchResults = response;
    submittedTerm = searchInputValue;

    $page.url.searchParams.set('search', searchInputValue);
    await goto($page.url, { keepFocus: true });

    const form = document.getElementById('search-form');
    if (form) {
      let position = form.getBoundingClientRect();
      window.scrollTo(position.left, position.top + window.scrollY - 100);
    }
  }
</script>

<Seo
  title="Handbook by Significa"
  description="Our handbook: the ultimate source of truth for everything about Significa—our culture, values, and the way we work."
  image={handbookOG}
  {structureDataMarkup}
/>
<div class="container mx-auto px-container pb-20">
  <h1 class="sr-only">Handbook by Significa</h1>
  <img alt="Handbook" src={handbook} class="mx-auto mb-20 mt-28 w-80" />

  <form
    id="search-form"
    class="relative m-auto mb-6 flex max-w-[600px] gap-2"
    on:submit|preventDefault={() => handleSearch()}
  >
    <div class="relative flex-1">
      <Input
        bind:value={searchInputValue}
        class={clsx('pr-28', searchInputValue && 'pr-32')}
        placeholder={$desktop
          ? 'Search! Because asking in Slack is overrated.'
          : 'Search the Handbook'}
        size="lg"
      />
      {#if searchInputValue}
        <button
          type="button"
          class="absolute right-[104px] top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
          on:click={() => {
            searchInputValue = '';
            submittedTerm = null;
            $page.url.searchParams.delete('search');
            goto($page.url, { keepFocus: true });
          }}
        >
          <Icon icon="close" size={16} />
        </button>
      {/if}
    </div>
    <Button type="submit" class="absolute right-1.5 top-1/2 -translate-y-1/2" variant="primary"
      >Search</Button
    >
  </form>

  {#if submittedTerm && searchResults.length > 0}
    <div
      class="mt-24 grid auto-rows-[minmax(82px,_auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each searchResults as searchResultPage}
        <HandbookIndexItem
          highlight={false}
          name={searchResultPage.name}
          slug={searchResultPage.full_slug}
          coverImage={searchResultPage.content?.cover}
          lastUpdated={searchResultPage.content?.last_updated}
        />
      {/each}
    </div>
  {:else if submittedTerm && searchResults.length === 0}
    <p class="mt-24 text-2xl font-semibold text-foreground-secondary">
      No results for "{submittedTerm}"
    </p>
  {:else}
    {#each hierarchy as chapter}
      <h2 class="mb-8 mt-20 text-2xl font-semibold">{chapter.name}</h2>
      <div
        class="grid auto-rows-[minmax(82px,_auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {#if chapter.homepage}
          <HandbookIndexItem
            highlight={chapter.highlight}
            name={chapter.name}
            slug={chapter.homepage.full_slug}
            coverImage={chapter.homepage.content?.cover}
            lastUpdated={chapter.homepage.content?.last_updated}
          />
        {/if}
        {#if chapter.children}
          {#each chapter.children as subchapter}
            <HandbookIndexItem
              highlight={subchapter.highlight}
              name={subchapter.homepage.name}
              slug={subchapter.homepage.full_slug}
              coverImage={subchapter.homepage.content?.cover}
              lastUpdated={subchapter.homepage.content?.last_updated}
            />
          {/each}
        {/if}
      </div>
    {/each}
  {/if}
</div>
