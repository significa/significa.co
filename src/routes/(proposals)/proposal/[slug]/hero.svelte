<script lang="ts">
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import type { ProposalStoryblok } from '$types/bloks';

  export let proposal: ProposalStoryblok;
  export let date: string | undefined;
</script>

<div class="container mx-auto px-container flex-1 pt-10 md:pt-14 lg:pt-20">
  <div class="max-w-2xl">
    <h2 class="text-7xl">{proposal.title}</h2>
    <h2 class="text-7xl text-foreground-secondary">{proposal.description}</h2>
  </div>

  <div class="flex gap-7 sm:gap-12 mt-10">
    <div>
      <p class="text-base font-semibold leading-none text-foreground-secondary">
        {t('proposals.hero.client')}
      </p>
      <p class="mt-1 text-base font-semibold leading-none">
        {proposal.client}
      </p>
    </div>

    <div>
      <p class="text-base font-semibold leading-none text-foreground-secondary">
        {t('proposals.hero.createdby')}
      </p>
      <p class="mt-1 text-base font-semibold leading-none">
        {proposal.created_by.member.name}
      </p>
    </div>

    {#if date}
      <div>
        <p class="text-base font-semibold leading-none text-foreground-secondary">
          {t('proposals.hero.date')}
        </p>
        <p class="mt-1 text-base font-semibold leading-none">
          {formatDate(new Date(date), {
            dateStyle: 'medium'
          })}
        </p>
      </div>
    {/if}
  </div>

  {#if proposal.cover.filename}
    {@const { alt, src, width, height } = getImageAttributes(proposal.cover, {
      size: [1440, 0]
    })}
    <div class="mt-12">
      <img class="h-auto w-full rounded-md bg-background-offset" {src} {alt} {width} {height} />
    </div>
  {/if}
</div>
