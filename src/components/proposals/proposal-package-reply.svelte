<script lang="ts">
  import { Button } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';
  import { page } from '$app/stores';
  import { formatter } from '$lib/utils/currency';
  import type {
    ProposalDeliverableStoryblok,
    ProposalDeliverableTeamEntryStoryblok,
    ProposalPackagePricingStoryblok,
    ProposalPackageTeamEntryStoryblok,
    ProposalTeamEntryStoryblok
  } from '$types/bloks';
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

  $: totalMonths = Math.ceil(
    deliverables
      .reduce(
        (acc: ProposalDeliverableTeamEntryStoryblok[], current) => [...acc, ...current.team],
        []
      )
      .reduce(
        (max: number, current) =>
          +current.duration + +current.offset > max ? +current.duration + +current.offset : max,
        0
      )
  );

  $: totalValue = monthlyTotal * totalMonths - (monthlyTotal * totalMonths * discount) / 100;
</script>

<section class="container mx-auto px-container mt-20">
  <h1 class="border rounded-t-lg text-xl font-semibold p-6">
    {t('proposals.package.reply.title')}
  </h1>

  <div class="grid grid-flow-row lg:grid-flow-col gap-y-2 p-6 border-l border-r">
    <div class="flex justify-between lg:flex-col">
      <p class="lg:text-sm text-foreground-secondary">{t('proposals.package.reply.people')}</p>
      <p class="text-base lg:text-xl">{team.length}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <Popover>
        <p
          slot="target"
          class="lg:text-sm text-foreground-secondary underline decoration-dashed underline-offset-4"
        >
          {t('proposals.package.reply.manpower')}
        </p>

        <div slot="popover">
          <h2 class="font-medium text-foreground text-sm">
            {t('proposals.package.reply.manpower.title')}
          </h2>
          <p class="text-sm">{t('proposals.package.reply.manpower.desc')}</p>
        </div>
      </Popover>
      <p class="text-base lg:text-xl">{totalManpower} {t('proposals.months')}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="lg:text-sm text-foreground-secondary">
        {t('proposals.package.reply.total-months')}
      </p>
      <p class="text-base lg:text-xl">{totalMonths} {t('proposals.months')}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="lg:text-sm text-foreground-secondary">
        {t('proposals.package.reply.monthly-cost')}
      </p>
      <p class="text-base lg:text-xl">{formatter.format(monthlyTotal)}</p>
    </div>

    {#if discount}
      <div class="flex justify-between lg:flex-col">
        <p class="lg:text-sm text-foreground-secondary">{t('proposals.package.reply.discount')}</p>
        <p class="text-base lg:text-xl">{discount} %</p>
      </div>
    {/if}

    <div class="flex justify-between lg:flex-col lg:justify-self-end">
      <p class="lg:text-sm">{t('proposals.package.reply.total')}</p>
      <p class="text-base lg:text-xl font-semibold">{formatter.format(totalValue)}</p>
    </div>
  </div>

  <div
    class={clsx(
      'flex flex-col lg:flex-row items-start lg:items-center lg:justify-between p-6',
      'bg-foreground dark:bg-background-offset text-foreground border rounded-b-lg'
    )}
  >
    <h3 class="text-xl font-semibold text-white w-2/3 lg:w-full">
      {t('proposals.reply.description')}
    </h3>

    <Button as="a" href={`${$page.url.pathname}/accept`} class="bg-white text-black mt-6 lg:mt-0"
      >{t('proposals.nav.action.long')}</Button
    >
  </div>
</section>
