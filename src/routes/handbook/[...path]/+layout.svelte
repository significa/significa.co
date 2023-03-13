<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { bodyLock } from '$lib/actions/body-lock';
  import { t } from '$lib/i18n';
  import { Icon, TextButton } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';

  export let data;

  let sidebar = writable(false);

  afterNavigate(() => {
    sidebar.set(false);
  });

  type Entry = { name: string; slug: string };
  type Folder = Entry & { entries: Entry[] };

  $: directory = Object.values(data.links).reduce((acc, value) => {
    if (value.is_folder) {
      acc.push({
        name: value.name,
        slug: value.slug,
        entries: Object.values(data.links)
          .filter((link) => !link.is_folder && link.parent_id === value.id)
          .map((link) => ({ name: link.name, slug: link.slug }))
      });
    }

    return acc;
  }, [] as Folder[]);

  $: allEntries = directory.reduce((acc, value) => {
    acc.push(...value.entries);
    return acc;
  }, [] as Entry[]);

  $: currIndex = allEntries.findIndex(
    (entry) => $page.url.pathname === `/${entry.slug.replace(/\/$/g, '')}`
  );

  let mobileMenu: HTMLDivElement;
  let mobileMenuTop: number;
  $: if ($sidebar) {
    mobileMenuTop = mobileMenu.getBoundingClientRect().top;
  }
</script>

<div class="border-t border-b border-border" use:bodyLock={sidebar}>
  <!-- Mobile: open menu -->
  <div
    bind:this={mobileMenu}
    class="sticky top-0 z-10 flex h-12 items-center border-b border-border bg-background px-container py-2 lg:hidden"
  >
    <TextButton iconLeft="hamburger" on:click={() => sidebar.set(true)}>
      {allEntries[currIndex]?.name || t('handbook')}
    </TextButton>
  </div>
  <div class="flex flex-col lg:flex-row">
    <aside
      class={clsx(
        'fixed top-0 bottom-0 z-10 w-full overflow-y-auto border-r border-border bg-background lg:relative lg:top-auto lg:bottom-auto lg:block lg:h-auto lg:w-72 lg:overflow-y-visible',
        $sidebar ? 'block' : 'hidden'
      )}
      style={$sidebar ? `top: ${mobileMenuTop}px` : ''}
    >
      <!-- Mobile: close menu -->
      <div
        class="sticky top-0 z-10 flex h-12 items-center border-b border-border bg-background px-container py-2 lg:hidden"
      >
        <TextButton iconLeft="close" on:click={() => sidebar.set(false)}>{t('close')}</TextButton>
      </div>
      <ul class="sticky top-0 -mb-px">
        <a
          class={clsx(
            'flex h-12 items-center border-b border-border px-container py-4 text-xs font-medium uppercase tracking-wider transition-colors hover:bg-foreground-tertiary/10',
            $page.url.pathname === '/handbook' && 'pointer-events-none bg-foreground-tertiary/10'
          )}
          href="/handbook"
        >
          {t('handbook')}
        </a>
        {#each directory as folder}
          {@const isCurrentFolder = $page.url.pathname.startsWith(`/${folder.slug}`)}
          <div
            class={clsx(
              'border-b border-border transition-colors hover:bg-foreground-tertiary/10',
              isCurrentFolder && 'bg-foreground-tertiary/10'
            )}
          >
            <a
              href="/{folder.slug}"
              class={clsx(
                'flex h-12 items-center justify-between py-4 px-container',
                isCurrentFolder && 'pointer-events-none'
              )}
            >
              <span class="text-xs font-medium uppercase tracking-wider">{folder.name}</span>
              {#if !isCurrentFolder}
                <Icon class="text-foreground-tertiary" icon="chevron" />
              {/if}
            </a>
            {#if isCurrentFolder}
              <ul class="px-container pb-4" transition:slide>
                {#each folder.entries as entry}
                  <li class="mb-1.5">
                    <a
                      class={clsx(
                        'text-base transition-colors hover:text-foreground-accent',
                        allEntries[currIndex]?.slug === entry.slug
                          ? 'text-foreground-accent'
                          : 'text-foreground'
                      )}
                      href="/{entry.slug}">{entry.name}</a
                    >
                  </li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}
      </ul>
    </aside>
    <main class="flex-1">
      <slot />
      {#if allEntries[currIndex]}
        <div
          class="mb-px flex h-12 justify-between border-t border-border text-foreground-secondary"
        >
          {#if allEntries[currIndex - 1]}
            <TextButton
              as="a"
              href={`/${allEntries[currIndex - 1].slug}`}
              class="p-4 text-sm"
              iconLeft="arrow-left"
            >
              {allEntries[currIndex - 1].name}
            </TextButton>
          {:else}
            <div />
          {/if}
          {#if allEntries[currIndex + 1]}
            <TextButton
              as="a"
              href={`/${allEntries[currIndex + 1].slug}`}
              class="p-4 text-sm"
              iconRight="arrow-right"
            >
              {allEntries[currIndex + 1].name}
            </TextButton>
          {/if}
        </div>
      {/if}
    </main>
  </div>
</div>
