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
    'container mx-auto',
    'grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-x-10 md:gap-x-12 mt-12 px-6 md:px-12 pb-10 md:pb-14 lg:pb-20'
  )}
>
  <h2 class="text-7xl">{proposal.title}</h2>
  <h2 class="col-start-1 text-7xl text-foreground-secondary">{proposal.description}</h2>

  <div
    class="col-start-1 grid grid-rows-2 grid-flow-col grid-cols-[max-content_max-content_max-content] gap-x-7 sm:gap-x-12 mt-10"
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
