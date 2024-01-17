<script lang="ts">
  import { escapeKey, clickOutside, bodyLock } from '@significa/svelte-ui/actions';
  import { Button, Link, Logo, Select } from '@significa/svelte-ui';
  import { page } from '$app/stores';
  import clsx from 'clsx';
  import { fade, fly } from 'svelte/transition';
  import { t } from '$lib/i18n';
  import { slugify } from '$lib/utils/paths';
  import { createTopNavScrollStatus } from '$lib/stores/topnav-scroll-status';

  export let sections: string[] = [];
  export let versions: string[] = [];
  export let version: string = '';

  let panel = false;

  const scrollStatus = createTopNavScrollStatus();
</script>

<div class="mb-px h-[--topnav-height]">
  <header
    class={clsx(
      'ease-[cubic-bezier(0.90, 0, 0.05, 1)] z-30 w-full border-b bg-background/95 backdrop-blur-md transition-[transform,border-color] duration-300 fixed',
      !$scrollStatus.isPastZero ? 'border-b-transparent' : 'border-b-border',
      !$scrollStatus.isPastThreshold
        ? 'translate-y-0'
        : $scrollStatus.direction === 'down'
        ? '-translate-y-full'
        : 'translate-y-0'
    )}
  >
    <div
      class={'flex items-center justify-between py-4 container mx-auto px-container h-[--topnav-height]'}
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
            <Button as="a" href={`${$page.url.pathname}/accept`}>
              <span aria-hidden="true" class="hidden [@media(min-width:400px)]:block">
                {t('proposals.nav.action.long')}
              </span>
              <span aria-hidden="true" class="block [@media(min-width:400px)]:hidden">
                {t('proposals.nav.action.short')}
              </span>
            </Button>

            <Button
              class="block xl:hidden"
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
      class={'px-container pl-6 fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col items-start overflow-y-auto bg-background py-4'}
    >
      <div class="flex w-full items-center justify-between">
        <Logo variant="symbol" />
        <div class="flex gap-4">
          <!-- FIXME: this button should do something-->
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
