<script lang="ts">
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import type {
    ProposalEstimateEntryStoryblok,
    ProposalPackageTeamEntryStoryblok,
    ProposalTeamEntryStoryblok
  } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import { formatter } from '$lib/utils/currency';
  import { slide } from 'svelte/transition';

  type PhaseTeamType = {
    name: string;
    role: string | undefined;
    rateType: string;
    rateValue: number;
    duration: number;
  }[];

  export let data: ProposalEstimateEntryStoryblok[];
  export let team: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[];
  export let discount: string | undefined;

  let openPanes = Array(data.length).fill(false);

  let subtotal: number = 0;
  let totalDuration: number = 0;
  let discountedValue: number = 0;
  let grandTotal: number = 0;

  $: estimates = data.map(({ color, phases, title }) => {
    const enhancedPhases = phases.map((phase) => {
      // Add team member rate info to phase team object
      const phaseTeam = phase.team.map((person) => {
        const teamMember = team.find(
          (member) => member.team_member.member.name === person.team_member.member.name
        );

        return {
          name: teamMember?.team_member.member.name,
          role: teamMember?.role[0].title,
          rateType: teamMember?.rate_type,
          rateValue: +teamMember?.rate_value,
          duration: +person.duration
        };
      });

      // add partial totals to phase object
      const phaseRate = phaseTeam.reduce(
        (total, member) =>
          (total += member.rateType === 'value' ? member.rateValue * member.duration : 0),
        0
      );
      const phasePercentage = phaseTeam.reduce(
        (total, member) => (total += member.rateType === 'percentage' ? member.rateValue : 0),
        0
      );

      return {
        ...phase,
        team: phaseTeam,
        duration: phaseTeam.reduce((total, member) => (total += member.duration), 0),
        rate: phaseRate,
        percentage: phasePercentage
      };
    });

    // add totals to data object
    const totalRate = enhancedPhases.reduce((total, { rate }) => (total += rate), 0);
    const totalPercentage = enhancedPhases.reduce(
      (total, { percentage }) => (total += percentage),
      0
    );

    const totalTeam = [
      ...new Set(
        enhancedPhases
          .reduce((acc: PhaseTeamType, { team }) => [...acc, ...team], [])
          .map((member) => member.name)
      )
    ].length;

    return {
      color,
      title,
      totals: {
        phases: enhancedPhases.length,
        team: totalTeam,
        cost: totalRate + (totalRate * totalPercentage) / 100,
        duration: enhancedPhases.reduce((total, { duration }) => (total += duration), 0)
      },
      phases: enhancedPhases
    };
  });

  $: subtotal = estimates.reduce((subtotal, estimate) => (subtotal += estimate.totals.cost), 0);
  $: totalDuration = estimates.reduce(
    (subtotal, estimate) => (subtotal += estimate.totals.duration),
    0
  );

  $: discountedValue = discount ? (subtotal * +discount) / 100 : 0;
  $: grandTotal = subtotal - discountedValue;
</script>

<div class="mt-10 overflow-x-scroll md:mt-14 lg:mt-20">
  <!-- Header -->
  <div class="min-w-[780px] border-b border-foreground-secondary">
    <div
      class={clsx(
        'container mx-auto px-container',
        'grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2.7fr_0.3fr]',
        'gap-10 py-2 md:gap-12'
      )}
    >
      <p class="text-2xs uppercase text-foreground-secondary">
        {t('proposals.estimates.area')}
      </p>

      <div class="grid grid-cols-[2fr_1fr_1fr_1fr]">
        <p class="text-2xs uppercase text-foreground-secondary">
          {t('proposals.estimates.phases')}
        </p>

        <p class="text-2xs uppercase text-foreground-secondary">
          {t('proposals.estimates.team')}
        </p>

        <p class="text-right text-2xs uppercase text-foreground-secondary">
          {t('proposals.estimates.duration')}
        </p>

        <p class="text-right text-2xs uppercase text-foreground-secondary">
          <span aria-hidden="true" class="hidden lg:block">
            {t('proposals.estimates.estimated-cost.long')}
          </span>
          <span aria-hidden="true" class="block lg:hidden">
            {t('proposals.estimates.estimated-cost.short')}
          </span>
        </p>
      </div>
    </div>
  </div>

  {#each estimates as estimate, i}
    {#if openPanes[i]}
      <!-- Expanded View -->
      <div
        transition:slide|global={{ duration: 300 }}
        class="min-w-[780px] border-b border-foreground-tertiary bg-foreground-tertiary/10"
      >
        <div
          class={clsx(
            'container mx-auto px-container',
            'grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2.7fr_0.3fr]',
            'gap-x-10 md:gap-x-12'
          )}
        >
          <div class="col-start-1 -ml-3.5 py-4 text-sm font-bold">
            <p class="flex items-center">
              <span
                style="background-color: {estimate.color}"
                class="mr-1.5 inline-block h-2 w-2 rounded-full"
              ></span>
              {estimate.title}.
            </p>

            <div class="ml-3.5 mt-1 block lg:hidden">
              <Button
                variant="secondary"
                size="sm"
                class="h-6 items-center bg-background text-2xs uppercase"
                on:click={() => {
                  openPanes[i] = !openPanes[i];
                }}
              >
                {openPanes[i] ? t('proposals.hide') : t('proposals.show')}
              </Button>
            </div>
          </div>

          {#each estimate.phases as phase}
            <div
              class={clsx(
                'col-start-2',
                'grid grid-cols-[2fr_1fr_1fr_1fr]',
                'border-b border-foreground-tertiary',
                '[&>div:nth-last-child(-n+3)]:border-b-0'
              )}
            >
              <div
                class="col-start-1 py-4 pr-2"
                style="grid-row: 1 / span {estimate.totals.phases}"
              >
                <p class="text-sm font-bold">
                  {phase.title}.
                </p>

                <p class="text-sm text-foreground-secondary">
                  {phase.description}
                </p>
              </div>

              {#each phase.team as person}
                <div class="col-start-2 border-b border-foreground-tertiary py-4 text-sm">
                  {person.role}
                </div>

                <div
                  class="col-start-3 border-b border-foreground-tertiary py-4 text-right text-sm"
                >
                  {person.duration}
                </div>

                <div
                  class="col-start-4 border-b border-foreground-tertiary py-4 text-right text-sm"
                >
                  {#if person.rateType === 'percentage' && person.rateValue}
                    {person.rateValue} %
                  {:else if person.rateType === 'value' && person.rateValue}
                    {formatter.format(person.duration * person.rateValue)}
                  {:else if person.rateType === 'free'}
                    {t('proposals.included')}
                  {/if}
                </div>
              {/each}
            </div>
          {/each}

          <div class="col-start-2 grid grid-cols-[2fr_1fr_1fr_1fr] py-4">
            <div class="text-sm">
              {estimate.totals.phases}
              {#if estimate.totals.phases > 1}
                {t('proposals.estimates.phases')}
              {:else}
                {t('proposals.estimates.phase')}
              {/if}
            </div>
            <div class="text-sm">
              {estimate.totals.team}
              {#if estimate.totals.team > 1}
                {t('proposals.estimates.people')}
              {:else}
                {t('proposals.estimates.person')}
              {/if}
            </div>
            <div class="text-right text-sm">{estimate.totals.duration}</div>
            <div class="text-right text-sm">{formatter.format(estimate.totals.cost)}</div>
          </div>

          <div class="col-start-3 row-start-1 hidden justify-self-end py-4 lg:block">
            <Button
              variant="secondary"
              size="sm"
              class="h-6 items-center bg-background text-2xs uppercase"
              on:click={() => {
                openPanes[i] = !openPanes[i];
              }}
            >
              {openPanes[i] ? t('proposals.hide') : t('proposals.show')}
            </Button>
          </div>
        </div>
      </div>
    {:else}
      <!-- CollapsedView -->
      <div class="min-w-[780px] border-b border-foreground-tertiary">
        <div
          class={clsx(
            'container mx-auto px-container',
            'grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2.7fr_0.3fr]',
            'gap-x-10 py-4 md:gap-x-12'
          )}
        >
          <div class="col-start-1 -ml-3.5 text-sm font-bold">
            <p class="flex items-center">
              <span
                style="background-color: {estimate.color}"
                class="mr-1.5 inline-block h-2 w-2 rounded-full"
              ></span>
              {estimate.title}.
            </p>

            <div class="ml-3.5 mt-1 block lg:hidden">
              <Button
                variant="secondary"
                size="sm"
                class="h-6 items-center bg-background text-2xs uppercase"
                on:click={() => {
                  openPanes[i] = !openPanes[i];
                }}
              >
                {openPanes[i] ? t('proposals.hide') : t('proposals.show')}
              </Button>
            </div>
          </div>

          <div class="col-start-2 grid grid-cols-[2fr_1fr_1fr_1fr]">
            <div class="text-sm">
              {estimate.totals.phases}
              {#if estimate.totals.phases > 1}
                {t('proposals.estimates.phases')}
              {:else}
                {t('proposals.estimates.phase')}
              {/if}
            </div>
            <div class="text-sm">
              {estimate.totals.team}
              {#if estimate.totals.team > 1}
                {t('proposals.estimates.people')}
              {:else}
                {t('proposals.estimates.person')}
              {/if}
            </div>
            <div class="text-right text-sm">{estimate.totals.duration}</div>
            <div class="text-right text-sm">{formatter.format(estimate.totals.cost)}</div>
          </div>

          <div class="col-start-3 hidden justify-self-end lg:block">
            <Button
              variant="secondary"
              size="sm"
              class="h-6 items-center bg-background text-2xs uppercase"
              on:click={() => {
                openPanes[i] = !openPanes[i];
              }}
            >
              {openPanes[i] ? t('proposals.hide') : t('proposals.show')}
            </Button>
          </div>
        </div>
      </div>
    {/if}
  {/each}

  <!-- Totals -->
  <div class="min-w-[780px] border-b border-foreground-secondary">
    <div
      class={clsx(
        'container mx-auto px-container',
        'grid grid-cols-[1fr_3fr] gap-10 md:gap-12 lg:grid-cols-[1fr_2.7fr_0.3fr]'
      )}
    >
      <div class="col-start-2 grid grid-cols-[2fr_1fr_1fr_1fr]">
        <div class="col-start-2 border-b border-foreground-tertiary py-4 text-sm">
          {t('proposals.estimates.subtotal')}
        </div>
        <div class="col-start-3 border-b border-foreground-tertiary py-4 text-right text-sm">
          {totalDuration}
        </div>
        <div class="col-start-4 border-b border-foreground-tertiary py-4 text-right text-sm">
          {formatter.format(subtotal)}
        </div>

        {#if discount}
          <div class="col-start-2 border-b border-foreground-tertiary py-4 text-sm">
            {t('proposals.estimates.discount')}
            <span class="ml-2 rounded-sm border p-1 text-xs font-bold">{discount + '%'}</span>
          </div>
          <div class="col-start-3 border-b border-foreground-tertiary py-4 text-right text-sm">
            -
          </div>
          <div class="col-start-4 border-b border-foreground-tertiary py-4 text-right text-sm">
            -{formatter.format(discountedValue)}
          </div>
        {/if}

        <div class="col-start-2 py-4 text-sm font-bold">
          {t('proposals.estimates.grand-total')}
        </div>
        <div class="col-start-3 py-4 text-right text-sm font-bold">{totalDuration}</div>
        <div class="col-start-4 py-4 text-right text-sm font-bold">
          {formatter.format(grandTotal)}
        </div>
      </div>
    </div>
  </div>
</div>
