<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { Icon, TextButton } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { slide } from 'svelte/transition';

  export let data;

  let sidebar = false;

  afterNavigate(() => {
    sidebar = false;
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

  $: currentEntry = allEntries.find(
    (entry) => $page.url.pathname === `/${entry.slug.replace(/\/$/g, '')}`
  );
  $: previousEntry = allEntries.find(
    (entry, index) => currentEntry && index === allEntries.indexOf(currentEntry) - 1
  );
  $: nextEntry = allEntries.find(
    (entry, index) => currentEntry && index === allEntries.indexOf(currentEntry) + 1
  );
</script>

<div class="border-t border-b border-border">
  <div
    class="sticky top-0 z-10 flex h-12 items-center gap-2 border-b border-border bg-background px-container py-2 lg:hidden"
  >
    <TextButton iconLeft={sidebar ? 'close' : 'hamburger'} on:click={() => (sidebar = !sidebar)}>
      {currentEntry?.name || t('handbook')}
    </TextButton>
  </div>
  <div class="flex">
    <aside
      class={clsx(
        'sticky top-12 z-10 h-screen w-full overflow-y-auto border-r border-border bg-background md:relative md:w-60 md:overflow-y-visible lg:top-0 lg:block lg:h-auto lg:w-72',
        sidebar ? 'block' : 'hidden'
      )}
    >
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
                        currentEntry?.slug === entry.slug
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
    <main class="flex-1 overflow-hidden lg:overflow-visible">
      <slot />
      {#if currentEntry}
        <div
          class="mb-px flex h-12 justify-between border-t border-border text-foreground-secondary"
        >
          {#if previousEntry}
            <TextButton
              as="a"
              href={`/${previousEntry.slug}`}
              class="p-4 text-sm"
              iconLeft="arrow-left"
            >
              {previousEntry.name}
            </TextButton>
          {:else}
            <div />
          {/if}
          {#if nextEntry}
            <TextButton
              as="a"
              href={`/${nextEntry.slug}`}
              class="p-4 text-sm"
              iconRight="arrow-right"
            >
              {nextEntry.name}
            </TextButton>
          {/if}
        </div>
      {/if}
    </main>
  </div>
</div>
