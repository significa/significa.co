<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { formatter } from '$lib/utils/currency';
  import type {
    ProposalDeliverableStoryblok,
    ProposalDeliverableTeamEntryStoryblok,
    ProposalPackagePricingStoryblok,
    ProposalPackageTeamEntryStoryblok,
    ProposalTeamEntryStoryblok
  } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import Popover from './popover.svelte';

  export let team: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[];
  export let pricing: ProposalPackagePricingStoryblok[];
  export let deliverables: ProposalDeliverableStoryblok[];
  export let discount: number;

  $: technicalResourcesTotal = pricing
    .filter((resource) => resource.rate_type === 'fulltime')
    .reduce((acc, resource) => (acc = acc + +resource.rate_value * +resource.team_size), 0);

  $: monthlyTotal =
    technicalResourcesTotal +
    (technicalResourcesTotal *
      pricing
        ?.filter((resource) => resource.rate_type === 'percentage')
        .reduce((acc, resource) => (acc = acc + +resource.rate_value), 0)) /
      100;

  $: totalManpower = deliverables.reduce((acc, resource) => (acc = acc + +resource.manpower), 0);

  $: totalMonths = deliverables
    .reduce(
      (acc: ProposalDeliverableTeamEntryStoryblok[], current) => [...acc, ...current.team],
      []
    )
    .reduce(
      (max: number, current) =>
        +current.duration + +current.offset > max ? +current.duration + +current.offset : max,
      0
    );

  $: totalValue = monthlyTotal * totalMonths - (monthlyTotal * totalMonths * discount) / 100;
</script>

<section class="container mx-auto mt-20 px-container">
  <h1 class="rounded-t-lg border p-6 text-xl font-semibold">
    {t('proposals.package.reply.title')}
  </h1>

  <div class="grid grid-flow-row gap-y-2 border-l border-r p-6 lg:grid-flow-col">
    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary lg:text-sm">{t('proposals.package.reply.people')}</p>
      <p class="text-base lg:text-xl">{team.length}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <Popover>
        <p
          slot="target"
          class="text-foreground-secondary underline decoration-dashed underline-offset-4 lg:text-sm"
        >
          {t('proposals.package.reply.manpower')}
        </p>

        <div slot="popover">
          <h2 class="text-sm font-medium text-foreground">
            {t('proposals.package.reply.manpower.title')}
          </h2>
          <p class="text-sm">{t('proposals.package.reply.manpower.desc')}</p>
        </div>
      </Popover>
      <p class="text-base lg:text-xl">{totalManpower} {t('proposals.months')}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary lg:text-sm">
        {t('proposals.package.reply.total-months')}
      </p>
      <p class="text-base lg:text-xl">{totalMonths} {t('proposals.months')}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary lg:text-sm">
        {t('proposals.package.reply.monthly-cost')}
      </p>
      <p class="text-base lg:text-xl">{formatter.format(monthlyTotal)}</p>
    </div>

    {#if discount}
      <div class="flex justify-between lg:flex-col">
        <p class="text-foreground-secondary lg:text-sm">{t('proposals.package.reply.discount')}</p>
        <p class="text-base lg:text-xl">{discount} %</p>
      </div>
    {/if}

    <div class="flex justify-between lg:flex-col lg:justify-self-end">
      <p class="lg:text-sm">{t('proposals.package.reply.total')}</p>
      <p class="text-base font-semibold lg:text-xl">{formatter.format(totalValue)}</p>
    </div>
  </div>

  <div
    class={clsx(
      'flex flex-col items-start p-6 lg:flex-row lg:items-center lg:justify-between',
      'rounded-b-lg border bg-foreground text-foreground dark:bg-background-offset'
    )}
  >
    <h3 class="w-2/3 text-xl font-semibold text-white lg:w-full">
      {t('proposals.reply.description')}
    </h3>

    <Button as="a" href={`${$page.url.pathname}/accept`} class="mt-6 bg-white text-black lg:mt-0"
      >{t('proposals.nav.action.long')}</Button
    >
  </div>
</section>
