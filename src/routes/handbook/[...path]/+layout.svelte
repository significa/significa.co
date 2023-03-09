<script lang="ts">
  import { page } from '$app/stores';
  import { Icon } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { slide } from 'svelte/transition';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div class="border-t border-b border-border">
  <div class="flex min-h-screen">
    <aside class="w-72 border-r border-border">
      <ul class="sticky top-2 -mb-px">
        <a
          class={clsx(
            'flex items-center border-b border-border px-6 py-4 text-xs uppercase tracking-wider transition-colors hover:bg-foreground-tertiary/10',
            $page.url.pathname === '/handbook' && 'pointer-events-none bg-foreground-tertiary/10'
          )}
          href="/handbook"
        >
          Handbook
        </a>
        {#each Object.values(data.links) as folder}
          {@const isCurrentFolder = $page.url.pathname.startsWith(`/${folder.slug}`)}
          {#if folder.is_folder}
            <div
              class={clsx(
                'border-b border-border transition-colors hover:bg-foreground-tertiary/10',
                isCurrentFolder && 'bg-foreground-tertiary/10'
              )}
            >
              <a
                href="/{folder.slug}"
                class={clsx(
                  'flex items-center justify-between py-4 px-6',
                  isCurrentFolder && 'pointer-events-none'
                )}
              >
                <span class="text-xs uppercase tracking-wider">{folder.name}</span>
                {#if !isCurrentFolder}
                  <Icon class="text-foreground-tertiary" icon="chevron" />
                {/if}
              </a>
              {#if isCurrentFolder}
                <ul class="px-6 pb-4" transition:slide>
                  {#each Object.values(data.links) as sublink}
                    {#if !sublink.is_folder && sublink.parent_id === folder.id}
                      <li class="mb-1.5">
                        <a
                          class={clsx(
                            'text-base transition-colors hover:text-foreground-accent',
                            $page.url.pathname === `/${sublink.slug.replace(/\/$/g, '')}`
                              ? 'text-foreground-accent'
                              : 'text-foreground'
                          )}
                          href="/{sublink.slug}">{sublink.name}</a
                        >
                      </li>
                    {/if}
                  {/each}
                </ul>
              {/if}
            </div>
          {/if}
        {/each}
      </ul>
    </aside>
    <main class="flex-1"><slot /></main>
  </div>
</div>
