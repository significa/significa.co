<script lang="ts">
  import handbook from '$assets/handbook/handbook.svg';
  import placeholder from '$assets/handbook/handbook_placeholder.svg';
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import { formatDate } from '$lib/utils/dates.js';
  import Seo from '$components/seo.svelte';
  import handbookOG from '$assets/handbook/HandbookOG.jpg';

  export let data;

  const { chapters } = data;
</script>

<Seo
  title="Handbook by Significa"
  description="Our handbook, the source of truth of our existence."
  image={handbookOG}
/>

<div class="container mx-auto px-container pb-20">
  <img alt="Handbook" src={handbook} class="w-80 mx-auto mt-28 mb-20" />

  {#each Object.entries(chapters) as [title, pages]}
    <h1 class="font-semibold text-2xl mt-20 mb-8">{title.substring(4)}</h1>
    <div
      class="grid grid-cols-1 auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 cursor-pointer"
    >
      {#each pages as page}
        <a
          class={clsx(
            'border shadow-sm flex bg-background-panel hover:bg-background-offset group rounded-lg overflow-hidden',
            page.highlighted ? 'row-span-3 col-span-1 flex-col' : 'row-span-1 col-span-1'
          )}
          href={`/handbookv2/${page.slug}`}
        >
          {#if page.hasCover}
            <span
              class={clsx(
                'overflow-hidden block bg-center bg-no-repeat',
                page.highlighted
                  ? 'w-full border-b rounded-b-none h-full bg-[length:auto_100%] transition-all duration-300 group-hover:bg-[length:auto_120%]'
                  : 'w-20 bg-background-panel border-r rounded-r-none aspect-square bg-[length:380%] transition-all duration-300 group-hover:bg-[length:440%] shrink-0'
              )}
              style="background-image: url(/handbook/covers/{page.id});"
            >
            </span>
          {:else}
            <span
              class={clsx(
                'overflow-hidden block bg-center bg-no-repeat',
                page.highlighted
                  ? 'w-full border-b rounded-b-none h-full bg-cover'
                  : 'w-20 bg-background-panel border-r rounded-r-none aspect-square bg-[length:380%] shrink-0'
              )}
              style="background-image: url({placeholder});"
            >
            </span>
          {/if}

          <div class="flex flex-col px-4 font-medium justify-center min-h-[82px]">
            <h2 class="text-base/[20px] font-bold">{page.title}</h2>
            <p class="text-sm text-foreground-secondary pt-0.5">
              <span>{t('handbook.last.updated')}</span>
              <span class="text-foreground-tertiary">·</span>
              <span class="text-foreground">{formatDate(new Date(page.lastUpdatedAt))}</span>
            </p>
          </div>
        </a>
      {/each}
    </div>
  {/each}
</div>
