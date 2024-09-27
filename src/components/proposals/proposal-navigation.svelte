<script lang="ts">
  import { escapeKey, clickOutside, bodyLock } from '@significa/svelte-ui/actions';
  import { Button, Link, Logo, Select } from '@significa/svelte-ui';
  import { page } from '$app/stores';
  import clsx from 'clsx';
  import { fade, fly } from 'svelte/transition';
  import { t } from '$lib/i18n';
  import { slugify } from '$lib/utils/paths';
  import { createTopNavScrollStatus } from '$lib/stores/topnav-scroll-status';

  export let variant: 'default' | 'accept' = 'default';
  export let sections: string[] = [];
  export let versions: string[] = [];
  export let version: string = '';

  let panel = false;

  const scrollStatus = createTopNavScrollStatus();
</script>

<div class="h-[--topnav-height]">
  <header
    class={clsx(
      'fixed w-full z-30 border-b bg-background/95 backdrop-blur-md',
      'transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.90, 0, 0.05, 1)]',
      variant === 'default' && !$scrollStatus.isPastZero
        ? 'border-b-transparent'
        : 'border-b-border',
      variant === 'default' && !$scrollStatus.isPastThreshold
        ? 'translate-y-0'
        : $scrollStatus.direction === 'down'
          ? '-translate-y-full'
          : 'translate-y-0',
      variant === 'accept' && 'border-b-border'
    )}
  >
    <div
      class="flex items-center justify-between py-4 container mx-auto px-container h-[--topnav-height]"
    >
      <div class="flex items-center gap-6">
        <a aria-label="Go to homepage" href="/">
          <Logo class="mt-1" variant="wordmark" />
        </a>
        {#if versions.length > 1}
          <Select bind:value={version} size="md" class="w-full hidden md:flex text-sm">
            {#each versions as v}
              <option value={v}>{v}</option>
            {/each}
          </Select>
        {/if}
      </div>

      {#if sections.length > 0}
        <div class="flex items-center gap-8">
          <div class="hidden items-center gap-6 text-base font-medium leading-relaxed xl:flex">
            {#each sections as nav}
              <Link href="#{slugify(nav)}">{nav}</Link>
            {/each}
          </div>
          <div class="flex items-center gap-4">
            <Button
              class="block xl:hidden"
              aria-label="Open menu"
              variant="secondary"
              icon="3dots"
              on:click={() => {
                panel = true;
              }}
            />

            <Button as="a" href={`${$page.url.pathname}/accept`}>
              <span aria-hidden="true" class="hidden [@media(min-width:400px)]:block">
                {t('proposals.nav.action.long')}
              </span>
              <span aria-hidden="true" class="block [@media(min-width:400px)]:hidden">
                {t('proposals.nav.action.short')}
              </span>
            </Button>
          </div>
        </div>
      {/if}

      {#if variant === 'accept'}
        <Button
          variant="ghost"
          icon="close"
          as="a"
          href={$page.url.pathname.replace('/accept', '')}
        />
      {/if}
    </div>
  </header>

  {#if panel && (sections.length > 0 || versions.length > 1)}
    <div
      use:bodyLock
      use:escapeKey={{ id: 'top-navigation', callback: () => (panel = false) }}
      role="button"
      tabindex="0"
      on:keydown={onkeydown}
      transition:fade|global={{ duration: 200 }}
      class="fixed inset-0 z-50 bg-black/50"
      on:click={() => (panel = false)}
    />
    <div
      transition:fly|global={{ x: 1000, duration: 300 }}
      use:clickOutside={() => (panel = false)}
      class={clsx(
        'fixed w-full max-w-sm px-container bottom-0 right-0 top-0 z-50 overflow-y-auto pl-6 py-4',
        'flex flex-col items-start',
        'bg-background'
      )}
    >
      <div class="flex w-full items-center justify-between">
        <Logo variant="symbol" />
        <div class="flex gap-4">
          <Button
            aria-label="Close menu"
            size="md"
            variant="secondary"
            icon="close"
            on:click={() => (panel = false)}
          />
        </div>
      </div>

      <div class="w-full">
        {#if versions.length > 1}
          <div class="md:hidden block mt-10">
            <p class="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
              {t('proposals.nav.versions')}
            </p>
            <ul class="text-lg font-medium">
              {#each versions as v}
                <li class="mb-1 flex items-center gap-1.5">
                  <Link
                    active={v === version}
                    class="inline-block"
                    on:click={() => {
                      version = v;
                      panel = false;
                    }}>{v}</Link
                  >
                </li>
              {/each}
            </ul>
          </div>
        {/if}
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
