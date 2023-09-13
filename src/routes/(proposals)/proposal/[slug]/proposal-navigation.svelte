<script lang="ts">
  import { escapeKey, clickOutside, bodyLock } from '@significa/svelte-ui/actions';
  import { Button, Link, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { slugify } from '$lib/utils/paths';

  export let sections: string[];

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
</script>

<svelte:window bind:scrollY />

<div class="mb-px h-[76px]">
  <header
    class={clsx(
      'ease-[cubic-bezier(0.90, 0, 0.05, 1)] z-30 w-full border-b bg-background/95 backdrop-blur-md transition-[transform,border-color] duration-300 fixed',
      !isPastZero ? 'border-b-transparent' : 'border-b-border',
      !isPastThreshold
        ? 'translate-y-0'
        : scrollDir === 'down'
        ? '-translate-y-full'
        : 'translate-y-0'
    )}
  >
    <div class={'flex items-center justify-between py-4 container mx-auto px-container'}>
      <div class="flex items-center gap-2">
        <a aria-label="Go to homepage" href="/">
          <Logo class="mt-1" variant="wordmark" />
        </a>
      </div>

      {#if sections.length > 0}
        <div class="flex items-center gap-8">
          <div class="hidden items-center gap-6 text-base font-medium leading-relaxed lg:flex">
            {#each sections as nav}
              <Link href="#{slugify(nav)}">{nav}</Link>
            {/each}
          </div>
          <div class="flex items-center gap-4">
            <!-- FIXME: this button should do something-->
            <Button>
              <span aria-hidden="true" class="hidden [@media(min-width:400px)]:block">
                {t('proposals.nav.action.long')}
              </span>
              <span aria-hidden="true" class="block [@media(min-width:400px)]:hidden">
                {t('proposals.nav.action.short')}
              </span>
            </Button>

            <Button
              class="block lg:hidden"
              aria-label="Open menu"
              variant="secondary"
              icon="3dots"
              on:click={() => {
                panel = true;
              }}
            />
          </div>
        </div>
      {/if}
    </div>
  </header>

  {#if panel && sections.length > 0}
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
      class={'px-container pl-6 fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col items-start overflow-y-auto bg-background py-4'}
    >
      <div class="flex w-full items-center justify-between">
        <Logo variant="symbol" />
        <div class="flex gap-4">
          <!-- TODO: botao a funcionar-->
          <Button class="flex-shrink-0" as="a">{t('proposals.nav.action.long')}</Button>

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
        <div class="mt-8">
          <p class="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
            {t('proposals.nav.title')}
          </p>
          <ul class="text-lg font-medium">
            {#each sections as nav}
              <li class="mb-1 flex items-center gap-1.5">
                <Link
                  href="#{slugify(nav)}"
                  class="inline-block"
                  on:click={() => {
                    panel = false;
                  }}>{nav}</Link
                >
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>
