<script lang="ts">
  import HandbookIndexItemSkeleton from '../index-page/HandbookIndexItemSkeleton.svelte';
  import HandbookIndexItem from '../index-page/HandbookIndexItem.svelte';
  import { page } from '$app/stores';

  import Seo from '$components/seo.svelte';
  import handbookOG from '$assets/handbook/HandbookOG.jpg';

  import { structureDataMarkup } from '../index-page/structure-data-markup';

  import { fetchEntries } from '$lib/content';
  import type { HandbookPage } from '$lib/content';
  import clsx from 'clsx';
  import { SEARCH_QUERY_PARAM } from '$lib/constants';

  let isLoading: boolean = false;
  let searchInputValue = '';
  let submittedTerm: string | null = null;
  let searchResults: HandbookPage[] = [];

  $: if (searchInputValue === '') {
    searchResults = [];
    submittedTerm = null;
  }

  $: urlSearchTerm = $page.url.searchParams.get(SEARCH_QUERY_PARAM) || '';

  $: if (urlSearchTerm) {
    searchInputValue = urlSearchTerm;
    handleSearch();
  }

  async function handleSearch() {
    isLoading = true;

    const response = await fetchEntries<HandbookPage>(
      { version: $page.data.version || 'published' },
      { starts_with: 'handbook', search_term: searchInputValue }
    );

    searchResults = response;
    submittedTerm = searchInputValue;

    isLoading = false;
  }
</script>

<Seo
  title="Handbook by Significa"
  description="Our handbook: the ultimate source of truth for everything about Significa—our culture, values, and the way we work."
  image={handbookOG}
  {structureDataMarkup}
/>

<main>
  <div class={clsx('container mx-auto min-h-[101vh] px-container pb-20 pt-36 md:pt-20')}>
    {#if searchInputValue}
      <h1 class="mt-10 text-7xl md:mt-14 lg:mt-20">
        <span>{searchInputValue}.</span>
      </h1>
    {/if}
    {#if isLoading}
      <div
        class="mt-24 grid auto-rows-[minmax(82px,_auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {#each Array(16) as _}
          <HandbookIndexItemSkeleton />
        {/each}
      </div>
    {:else if submittedTerm && searchResults.length > 0}
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
    {:else if !isLoading && submittedTerm && searchResults.length === 0}
      <p class="mt-24 text-2xl font-semibold text-foreground-secondary">
        No results for "{submittedTerm}"
      </p>
    {/if}
  </div>
</main>
