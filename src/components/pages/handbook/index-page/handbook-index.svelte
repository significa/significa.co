<script lang="ts">
  import HandbookIndexItem from './HandbookIndexItem.svelte';
  import { goto } from '$app/navigation';
  import handbook from '$assets/handbook/handbook_illustration.svg';
  import { fade } from 'svelte/transition';

  import Seo from '$components/seo.svelte';
  import handbookOG from '$assets/handbook/HandbookOG.jpg';

  import { structureDataMarkup } from './structure-data-markup';
  import type { HandbookLevelStoryblok } from '$types/bloks';
  import { Button, Input } from '@significa/svelte-ui';

  import clsx from 'clsx';
  import { createBreakpointMediaQueryStore } from '$lib/stores/media';

  export let hierarchy: HandbookLevelStoryblok[];

  let searchInputValue = '';
  const desktop = createBreakpointMediaQueryStore('md');

  async function handleSearch() {
    const sanitizedQuery = searchInputValue.trim();
    if (sanitizedQuery) {
      await goto(`/handbook/search?q=${encodeURIComponent(sanitizedQuery)}`, { keepFocus: true });
    }
  }
</script>

<Seo
  title="Handbook by Significa"
  description="Our handbook: the ultimate source of truth for everything about Significa—our culture, values, and the way we work."
  image={handbookOG}
  {structureDataMarkup}
/>
<div class="container mx-auto px-container">
  <h1 class="sr-only">Handbook by Significa</h1>
  <img alt="Handbook" src={handbook} class="mx-auto mb-20 mt-28 w-80" />

  <form
    id="search-form"
    class="relative m-auto mb-6 flex max-w-[600px] gap-2"
    on:submit|preventDefault={() => handleSearch()}
  >
    <Input
      bind:value={searchInputValue}
      class={clsx('pr-20')}
      placeholder={$desktop ? 'Search! Because asking in Slack is overrated.' : 'Search!'}
      size="lg"
    />

    {#if searchInputValue}
      <div transition:fade={{ duration: 100 }} class="absolute right-1.5 top-1/2 -translate-y-1/2">
        <Button type="submit" size="md" icon="arrow-right" variant="primary"></Button>
      </div>
    {/if}
  </form>

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
</div>
