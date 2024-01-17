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
      ) / 20
  );

  $: totalValue = monthlyTotal * totalMonths - (monthlyTotal * totalMonths * discount) / 100;
</script>

<section class="container mx-auto px-container mt-20">
  <h1 class="border rounded-t-lg text-xl font-semibold p-6">Estimated cost & duration</h1>

  <div class="grid grid-flow-row lg:grid-flow-col gap-y-2 p-6 border-l border-r">
    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary">Total people</p>
      <p class="text-xl">{team.length}</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary">Estimated manpower</p>
      <p class="text-xl">{totalManpower} months</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary">Estimated duration</p>
      <p class="text-xl">{totalMonths} months</p>
    </div>

    <div class="flex justify-between lg:flex-col">
      <p class="text-foreground-secondary">Monthly Cost</p>
      <p class="text-xl">{formatter.format(monthlyTotal)}</p>
    </div>

    {#if discount}
      <div class="flex justify-between lg:flex-col">
        <p class="text-foreground-secondary">Applied Discount</p>
        <p class="text-xl">{discount}%</p>
      </div>
    {/if}

    <div class="flex justify-between lg:flex-col lg:justify-self-end">
      <p class="">Estimated total</p>
      <p class="text-xl font-semibold">{formatter.format(totalValue)}</p>
    </div>
  </div>

  <div
    class="bg-black flex flex-col lg:flex-row lg:items-center lg:justify-between rounded-b-lg p-6"
  >
    <h3 class="text-xl text-white">{t('proposals.reply.description')}</h3>
    <Button as="a" href={`${$page.url.pathname}/accept`} class="bg-white text-black mt-6 lg:mt-0"
      >{t('proposals.nav.action.long')}</Button
    >
  </div>
</section>
