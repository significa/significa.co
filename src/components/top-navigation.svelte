<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { escapeKey, clickOutside, bodyLock } from '@significa/svelte-ui/actions';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Badge, Button, Link, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade, fly } from 'svelte/transition';
  import AnHandAndABook from './an-hand-and-a-book.svelte';
  import { onMount } from 'svelte';
  import { TrackingEvent, track } from '$lib/track';

  export let configuration: ConfigurationStoryblok;

  const SCROLL_DIR_THRESHOLD = 76;
  const SCROLL_THRESHOLD = 200;

  let panel = false;
  let scrollDir: 'up' | 'down';
  let scrollY: number;
  let lastScrollY: number;
  let ticking = false;
  let isPastThreshold = false;
  let isPastZero = false;

  onMount(() => {
    const updateScrollDir = () => {
      if (Math.abs(scrollY - lastScrollY) <= SCROLL_DIR_THRESHOLD) {
        ticking = false;
        return;
      }

      const nextDir = scrollY > lastScrollY ? 'down' : 'up';
      if (nextDir !== scrollDir) {
        scrollDir = nextDir;
      }

      const last = scrollY > 0 ? scrollY : 0;
      lastScrollY = last;

      if (last > SCROLL_THRESHOLD) {
        isPastThreshold = true;
      } else {
        isPastThreshold = false;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (scrollY > 0) {
        isPastZero = true;
      } else {
        isPastZero = false;
      }

      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  afterNavigate(() => {
    panel = false;
  });

  export let variant: 'default' | 'handbook' = 'default';
</script>

<svelte:window bind:scrollY />

<div class="mb-px h-[76px]">
  <header
    class={clsx(
      'ease-[cubic-bezier(0.90, 0, 0.05, 1)] z-30 w-full border-b bg-background/95 backdrop-blur-md transition-[transform,border-color] duration-300',
      variant === 'default' && 'fixed',
      !isPastZero && variant === 'default' ? 'border-b-transparent' : 'border-b-border',
      !isPastThreshold
        ? 'translate-y-0'
        : scrollDir === 'down' && variant === 'default'
        ? '-translate-y-full'
        : 'translate-y-0'
    )}
  >
    <div
      class={clsx(
        'flex items-center justify-between py-4',
        // we could achieve this with route groups and a different layout, but it's so simple that we'll leave it like this for now
        variant === 'handbook' ? 'px-6' : 'container mx-auto px-container'
      )}
    >
      <div class="flex items-center gap-2">
        <a aria-label="Go to homepage" href="/">
          <Logo class="mt-1" variant="wordmark" />
        </a>
        {#if variant === 'handbook'}
          <AnHandAndABook />
        {/if}
      </div>

      <div class="flex items-center gap-8">
        <div class="hidden items-center gap-6 text-base font-medium leading-relaxed md:flex">
          {#each configuration.primary_navigation || [] as nav}
            <Link
              active={$page.url.pathname === sanitizeSlug(nav.full_slug)}
              href={sanitizeSlug(nav.full_slug)}>{nav.name}</Link
            >
          {/each}
        </div>
        <div class="flex items-center gap-4">
          {#if configuration.call_to_action?.length}
            {@const { href } = getAnchorFromCmsLink(configuration.call_to_action[0].link)}
            <div class="hidden [@media(min-width:400px)]:block">
              <Button as="a" {href}>{configuration.call_to_action[0].label}</Button>
            </div>
          {/if}
          <Button
            aria-label="Open menu"
            variant="secondary"
            icon="3dots"
            on:click={() => {
              panel = true;
              track(TrackingEvent.NAV_MENU, { props: { path: $page.url.pathname } });
            }}
          />
        </div>
      </div>
    </div>
  </header>

  {#if panel}
    <div
      use:bodyLock
      use:escapeKey={{ id: 'top-navigation', callback: () => (panel = false) }}
      role="button"
      tabindex="0"
      on:keydown={onkeydown}
      transition:fade={{ duration: 200 }}
      class="fixed inset-0 z-50 bg-black/50"
      on:click={() => (panel = false)}
    />
    <div
      transition:fly={{ x: 1000, duration: 300 }}
      use:clickOutside={() => (panel = false)}
      class={clsx(
        variant === 'handbook' ? 'px-6' : 'px-container pl-6',
        'fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col items-start overflow-y-auto bg-background py-4'
      )}
    >
      <div class="flex w-full items-center justify-between">
        <Logo variant="symbol" />
        <div class="flex gap-4">
          {#if configuration.call_to_action?.length}
            {@const { href } = getAnchorFromCmsLink(configuration.call_to_action[0].link)}
            <Button
              class="flex-shrink-0"
              as="a"
              {href}
              on:click={() => {
                track(TrackingEvent.GET_A_QUOTE_LINK, {
                  props: { path: $page.url.pathname, context: 'navigation menu' }
                });
              }}>{configuration.call_to_action[0].label}</Button
            >
          {/if}
          <Button
            aria-label="Close menu"
            size="md"
            variant="secondary"
            icon="close"
            on:click={() => (panel = false)}
          />
        </div>
      </div>

      <div class="flex-1">
        {#each configuration.footer || [] as column}
          <div class="mt-8">
            <p class="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
              {column.title}
            </p>
            <ul class="text-lg font-medium">
              {#each column.links || [] as link}
                {#if column.component === 'footer-column-internal'}
                  <li class="mb-1 flex items-center gap-1.5">
                    <Link class="inline-block" href={sanitizeSlug(link.full_slug)}>{link.name}</Link
                    >
                    {#if sanitizeSlug(link.full_slug) === '/careers'}
                      {#if $page.data.careers.length}
                        <Badge class="text-xs">{$page.data.careers.length}</Badge>
                      {/if}
                    {/if}
                  </li>
                {:else if column.component === 'footer-column-external'}
                  {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
                  <li class="mb-1">
                    <Link class="inline-block" {href} {target} {rel}>{link.label}</Link>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
