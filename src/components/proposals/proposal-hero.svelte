<script lang="ts">
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import type { ProposalStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let proposal: ProposalStoryblok;
  export let date: string | undefined;
</script>

<div
  class={clsx(
    'container mx-auto px-container',
    'grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-12 mt-12'
  )}
>
  <h1 class="text-7xl md:col-span-2 md:max-w-[832px]">{proposal.title}</h1>
  <h2 class="col-start-1 text-7xl text-foreground-secondary md:col-span-2 md:max-w-[832px]">
    {proposal.description}
  </h2>

  <div
    class={clsx(
      'col-start-1 grid grid-rows-2 grid-flow-col grid-cols-[repeat(3,_max-content)]',
      'gap-x-7 sm:gap-x-12 mt-10'
    )}
  >
    <p class="text-base font-semibold leading-none text-foreground-secondary">
      {t('proposals.hero.client')}
    </p>
    <p class="mt-1 text-base font-semibold leading-none">
      {proposal.client}
    </p>

    <p class="text-base font-semibold leading-none text-foreground-secondary">
      {t('proposals.hero.createdby')}
    </p>
    <p class="mt-1 text-base font-semibold leading-none">
      {proposal.created_by.name}
    </p>

    {#if date}
      <p class="text-base font-semibold leading-none text-foreground-secondary">
        {t('proposals.hero.date')}
      </p>
      <p class="mt-1 text-base font-semibold leading-none">
        {formatDate(new Date(date), {
          dateStyle: 'medium'
        })}
      </p>
    {/if}
  </div>

  {#if proposal.cover.filename}
    {@const { alt, src, width, height } = getImageAttributes(proposal.cover, {
      size: [1440, 0]
    })}
    <div class="mt-12 md:col-span-2">
      <img class="rounded-md bg-background-offset" {src} {alt} {width} {height} />
    </div>
  {/if}
</div>
