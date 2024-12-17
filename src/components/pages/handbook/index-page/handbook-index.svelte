<script lang="ts">
  import handbook from '$assets/handbook/handbook_illustration.svg';
  import placeholder from '$assets/handbook/handbook_placeholder.svg';
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import { formatDate } from '$lib/utils/dates.js';
  import Seo from '$components/seo.svelte';
  import handbookOG from '$assets/handbook/HandbookOG.jpg';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ChapterCardsMap } from './types';
  import { structureDataMarkup } from './structure-data-markup';

  export let chapters: ChapterCardsMap;
</script>

<Seo
  title="Handbook by Significa"
  description="Our handbook: the ultimate source of truth for everything about Significa—our culture, values, and the way we work."
  image={handbookOG}
  {structureDataMarkup}
/>
<div class="container mx-auto px-container pb-20">
  <h1 class="sr-only">Handbook by Significa</h1>
  <img alt="Handbook" src={handbook} class="mx-auto mb-20 mt-28 w-80" />

  {#each chapters.entries() as [title, pages]}
    <h2 class="mb-8 mt-20 text-2xl font-semibold">{title.substring(4)}</h2>
    <div class="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each pages as page}
        <a
          data-highlight={page.highlight}
          class={clsx(
            'group flex overflow-hidden rounded-lg border bg-background-panel shadow-sm hover:bg-background-offset',
            page.highlight ? 'col-span-1 row-span-3 flex-col' : 'col-span-1 row-span-1'
          )}
          href={sanitizeSlug(page.full_slug)}
        >
          {#if page.cover.filename}
            {@const { src } = getImageAttributes(page.cover, { size: [1024, 0] })}
            <span
              class={clsx(
                'block overflow-hidden bg-center bg-no-repeat',
                page.highlight
                  ? 'h-full w-full rounded-b-none border-b bg-[length:auto_100%] transition-all duration-300 group-hover:bg-[length:auto_120%]'
                  : 'aspect-square w-20 shrink-0 rounded-r-none border-r bg-background-panel bg-[length:380%] transition-all duration-300 group-hover:bg-[length:440%]'
              )}
              style="background-image: url({src});"
            >
            </span>
          {:else}
            <span
              class={clsx(
                'block overflow-hidden bg-center bg-no-repeat',
                page.highlight
                  ? 'h-full w-full rounded-b-none border-b bg-cover'
                  : 'aspect-square w-20 shrink-0 rounded-r-none border-r bg-background-panel bg-[length:380%]'
              )}
              style="background-image: url({placeholder});"
            >
            </span>
          {/if}

          <div class="flex min-h-[82px] flex-col justify-center px-4 font-medium">
            <h2 class="text-base/[20px] font-bold">{page.name}</h2>
            <p class="pt-0.5 text-sm text-foreground-secondary">
              <span>{t('handbook.last.updated')}</span>
              <span class="text-foreground-tertiary">·</span>
              <span class="text-foreground">{formatDate(new Date(page.last_updated))}</span>
            </p>
          </div>
        </a>
      {/each}
    </div>
  {/each}
</div>
