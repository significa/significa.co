<script lang="ts">
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import { formatDate } from '$lib/utils/dates.js';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { getImageAttributes } from '$lib/utils/cms';
  import placeholder from '$assets/handbook/handbook_placeholder.svg';
  import type { AssetStoryblok } from '$types/bloks';

  export let highlight = false;
  export let name = '';
  export let slug = '/';
  export let coverImage: AssetStoryblok | undefined = undefined;
  export let lastUpdated = new Date().toISOString();
</script>

<a
  data-highlight={highlight}
  class={clsx(
    'group flex overflow-hidden rounded-lg border bg-background-panel shadow-sm hover:bg-background-offset',
    highlight ? 'col-span-1 row-span-3 flex-col' : 'col-span-1 row-span-1'
  )}
  href={sanitizeSlug(slug)}
>
  {#if coverImage?.filename}
    {@const { src } = getImageAttributes(coverImage, {
      size: [1024, 0]
    })}
    <span
      class={clsx(
        'block overflow-hidden bg-center bg-no-repeat',
        highlight
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
        highlight
          ? 'h-full w-full rounded-b-none border-b bg-cover'
          : 'aspect-square w-20 shrink-0 rounded-r-none border-r bg-background-panel bg-[length:380%]'
      )}
      style="background-image: url({placeholder});"
    >
    </span>
  {/if}

  <div class="flex min-h-[82px] flex-col justify-center px-4 font-medium">
    <h2 class="text-base/[20px] font-bold">
      {name}
    </h2>
    <p class="pt-0.5 text-sm text-foreground-secondary">
      <span>{t('handbook.last.updated')}</span>
      <span class="text-foreground-tertiary">·</span>
      <span class="text-foreground">{formatDate(new Date(lastUpdated))}</span>
    </p>
  </div>
</a>
