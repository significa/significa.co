<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Button, Icon, Input, Link, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import AnHandAndABook from './an-hand-and-a-book.svelte';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { t } from '$lib/i18n';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import { SEARCH_QUERY_PARAM } from '$lib/constants';

  export let configuration: ConfigurationStoryblok;

  let searchInputValue = '';

  async function handleSearch() {
    const sanitizedQuery = searchInputValue.trim();
    if (sanitizedQuery) {
      await goto(`/handbook/search?q=${encodeURIComponent(sanitizedQuery)}`, { keepFocus: true });
    }
  }

  $: urlSearchTerm = $page?.url.searchParams.get(SEARCH_QUERY_PARAM) || '';

  $: if (urlSearchTerm) {
    searchInputValue = urlSearchTerm;
  }
</script>

<header
  class={clsx('fixed top-0 z-30 w-full border-b border-b-border bg-background/95 backdrop-blur-md')}
>
  <div
    class={clsx(
      'container mx-auto grid items-center px-container py-4',
      'grid-cols-[1fr_1fr] grid-rows-[auto_auto] md:grid-rows-1',
      'gap-8 gap-y-4 md:grid-cols-[1fr_1fr_1fr]',
      $page.url.pathname == '/handbook' && '!gap-y-0'
    )}
  >
    <a class="flex items-center gap-2" aria-label="Go to homepage" href="/handbook">
      <Logo class="mt-1" variant="wordmark" />
      <AnHandAndABook />
    </a>

    <div
      class={clsx(
        'col-span-2 row-start-2 w-full md:col-span-1 md:col-start-2 md:row-start-1 lg:max-w-[450px]'
      )}
    >
      {#if $page.url.pathname !== '/handbook'}
        <form
          id="search-form"
          class="relative"
          on:submit|preventDefault={() => handleSearch()}
          transition:fade={{ duration: 200 }}
        >
          <Input
            bind:value={searchInputValue}
            class={clsx('pr-14')}
            placeholder={'Search! Because asking in Slack is overrated.'}
            size="md"
          />
          {#if searchInputValue}
            <div
              transition:fade={{ duration: 100 }}
              class="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              <Button type="submit" size="sm" icon="arrow-right" variant="primary"></Button>
            </div>
          {/if}
        </form>
      {/if}
    </div>

    <div class="flex items-center justify-end gap-8">
      <div class="flex items-center gap-4">
        {#if configuration.call_to_action?.length}
          {@const { href } = getAnchorFromCmsLink(configuration.call_to_action[0].link)}
          <div class="block">
            <Button as="a" {href}>{configuration.call_to_action[0].label}</Button>
          </div>
        {/if}
      </div>

      <div class="hidden items-center gap-1 text-sm font-medium leading-relaxed lg:flex">
        <Icon icon="home" />
        <Link href={sanitizeSlug('/')} target="_blank" rel="noopener noreferrer">
          {t('handbook.navigation.website')}
        </Link>
      </div>
    </div>
  </div>
</header>
