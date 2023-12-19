<script lang="ts">
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import {
    getColumnsWidthClassName,
    getContainersPaddingClassName,
    getHeaderCellTextClassName,
    getStickyColClassName
  } from '$lib/utils/proposalTables';
  import type { ProposalEstimateEntryStoryblok, ProposalTeamEntryStoryblok } from '$types/bloks';
  import { Tag } from '@significa/svelte-ui';
  import { formatter } from '$lib/utils/currency';

  export let data: ProposalEstimateEntryStoryblok[];
  export let team: ProposalTeamEntryStoryblok[];
  export let discount: string | undefined;
  export let windowWidth: number;
  export let containerMargin: number;
  export let sectionTitleWidth: number;

  let firstColWidth: number;
  let stickyColWidth: number;
  let stickyColContentWidth: number;
  let emptyColWidth: number;

  let teamInfoMap = new Map();
  let areaInfoMap = new Map();

  let subtotal: number = 0;
  let totalDuration: number = 0;
  let discountedValue: number = 0;
  let grandTotal: number = 0;

  team.forEach((member) => {
    teamInfoMap.set(member.team_member.member.name, {
      role: member.role[0].title,
      rate_type: member.rate_type,
      rate_value: member.rate_value
    });
  });

  data.forEach((entry) => {
    let areaCounter = {
      phases: entry.phases.length,
      team: 0,
      duration: 0,
      cost: 0,
      percentage: 0
    };

    entry.phases.forEach((phase) => {
      areaCounter.team = areaCounter.team + phase.team.length;

      phase.team.forEach((team) => {
        areaCounter.duration = areaCounter.duration + +team.duration;
        const memberInfo = teamInfoMap.get(team.team_member.member.name);
        if (memberInfo?.rate_type == 'value') {
          areaCounter.cost = areaCounter.cost + +team.duration * +memberInfo.rate_value;
        } else if (memberInfo?.rate_type == 'percentage') {
          areaCounter.percentage = areaCounter.percentage + +memberInfo.rate_value;
        }
      });
    });

    areaCounter.cost = areaCounter.cost + areaCounter.cost * (areaCounter.percentage / 100);
    subtotal = subtotal + areaCounter.cost;
    totalDuration = totalDuration + areaCounter.duration;
    areaInfoMap.set(entry.title, areaCounter);
  });

  if (discount) {
    discountedValue = (subtotal * +discount) / 100;
    grandTotal = subtotal - discountedValue;
  } else {
    grandTotal = subtotal;
  }

  stickyColContentWidth = Math.max((('' + subtotal).length * 135) / 5.5, 175);

  $: centralColsWidth = (windowWidth - firstColWidth - stickyColWidth - emptyColWidth) / 3;
</script>

<div
  class="overflow-x-scroll md:overflow-hidden"
  style="--container-margin: {containerMargin}px;
  --section-title-width: {sectionTitleWidth}px;
  --central-cols-width: {centralColsWidth}px;
  --sticky-col-content-width: {stickyColContentWidth}px;"
>
  <table class="table-fixed w-[750px] md:w-full">
    <thead>
      <tr class="border-b border-foreground-secondary">
        <!-- Area Column -->
        <th
          class={clsx(
            getColumnsWidthClassName('first'),
            getContainersPaddingClassName('left'),
            'pr-4 lg:pr-12 py-2.5'
          )}
          bind:clientWidth={firstColWidth}
        >
          <p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.estimates.area')}
          </p>
        </th>
        <!-- Phases Column -->
        <th class={clsx(getColumnsWidthClassName('central'), 'pr-4 lg:pr-12 py-2.5')}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.estimates.phases')}
          </p>
        </th>
        <!-- Team Column-->
        <th class={clsx(getColumnsWidthClassName('central'), 'py-2.5')}>
          <p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.estimates.team')}
          </p>
        </th>
        <!-- Duration Column-->
        <th class={clsx(getColumnsWidthClassName('central'), 'lg:pl-12 pl-4 py-2.5 pr-4 md:pr-0')}>
          <p class={clsx(getHeaderCellTextClassName('right'))}>
            {t('proposals.estimates.duration')}
          </p>
        </th>
        <!-- Predicted Cost Column-->
        <th
          bind:clientWidth={stickyColWidth}
          class={clsx(
            getColumnsWidthClassName('sticky'),
            getContainersPaddingClassName('right'),
            'lg:pl-12 pl-4 lg:pr-0 py-2.5',
            getStickyColClassName()
          )}
        >
          <div class="w-px bg-foreground-tertiary md:w-0 absolute left-0 top-0 bottom-0" />
          <p class={clsx(getHeaderCellTextClassName('right'))}>
            {t('proposals.estimates.predicted-cost')}
          </p>
        </th>
        <!-- Empty Column-->
        <th
          class={clsx(
            getContainersPaddingClassName('right'),
            getColumnsWidthClassName('last-empty'),
            'bg-background md:bg-transparent drop-shadow-md md:drop-shadow-none',
            'hidden lg:block'
          )}
          bind:clientWidth={emptyColWidth}
        >
        </th>
      </tr>
    </thead>
    <tbody>
      {#each data as entry, i}
        {@const areaInfo = areaInfoMap.get(entry.title)}
        {#each entry.phases as phase, j}
          {#each phase.team as team, k}
            {@const teamMemberInfo = teamInfoMap.get(team.team_member.member.name)}
            <tr
              class={clsx(
                (j !== entry.phases.length - 1 || k !== phase.team.length - 1) &&
                  'border-b border-foreground-tertiary',
                i % 2 ? 'bg-background-offset ' : 'bg-background'
              )}
            >
              <!-- Area Cell -->
              {#if k == 0 && j == 0}
                <td
                  rowspan={areaInfo.team + 1}
                  class={clsx(
                    getContainersPaddingClassName('left'),
                    'py-4 pr-4 lg:pr-12 align-top'
                  )}
                >
                  <span
                    style="background-color: {entry.color}"
                    class="w-[8px] h-[8px] rounded-full inline-block mt-[9px] ml-[-16px] absolute"
                  ></span>
                  <p class="font-bold">
                    {entry.title}.
                  </p>
                  <p class="text-foreground-secondary">
                    {entry.description}
                  </p>
                </td>
              {/if}
              <!-- Phases Cell -->
              {#if k == 0}
                <td rowspan={phase.team.length} class={'pr-4 lg:pr-12 py-4  align-top'}>
                  <p class="font-bold">
                    {phase.title}.
                  </p>
                  <p class="text-foreground-secondary">
                    {phase.description}
                  </p>
                </td>
              {/if}
              <!-- Team Cell -->
              <td class={'py-4  align-top'}>
                {#if teamMemberInfo}
                  {teamMemberInfo.role}
                {/if}
              </td>
              <!-- Duration Cell -->
              <td class={'pl-4 lg:pl-12 py-4 pr-4 md:pr-0 align-top text-right tabular-nums'}>
                {team.duration}
              </td>
              <!-- Predicted Cost Cell -->
              <td
                class={clsx(
                  getStickyColClassName(),
                  getContainersPaddingClassName('right'),
                  'lg:pl-12 pl-4 py-4 lg:pr-0',
                  i % 2 ? 'bg-background-offset' : 'bg-background',
                  'align-top text-right tabular-nums'
                )}
              >
                <div class="w-px bg-foreground-tertiary md:w-0 absolute left-0 top-0 bottom-0" />
                {#if teamMemberInfo}
                  {#if teamMemberInfo.rate_type === 'percentage' && teamMemberInfo.rate_value}
                    <p>
                      {teamMemberInfo.rate_value} %
                    </p>
                  {:else if teamMemberInfo.rate_type === 'value' && teamMemberInfo.rate_value}
                    <p>
                      {formatter.format(+team.duration * +teamMemberInfo.rate_value)}
                    </p>
                  {:else if teamMemberInfo.rate_type === 'free'}
                    <p>{t('proposals.included')}</p>
                  {/if}
                {/if}
              </td>
              <!-- Empty Cell -->
              {#if k == 0 && j == 0}
                <td rowspan={areaInfo.team + 1} class="hidden lg:table-cell"> </td>
              {/if}
            </tr>
          {/each}
        {/each}
        <!-- AREA SUMS -->
        <tr
          class={clsx(
            'border-b border-b-foreground-tertiary',
            i % 2 ? 'bg-background-offset' : 'bg-background'
          )}
        >
          <!-- Total Phases Cell -->
          <td
            class={'lg:pr-12 pr-4 py-4 border-t border-t-foreground-secondary align-top tabular-nums'}
          >
            {areaInfo.phases}
            {#if areaInfo.phases == 1}
              {t('proposals.estimates.phases')}
            {:else}
              {t('proposals.estimates.phase')}
            {/if}
          </td>
          <!-- Total Team Cell -->
          <td class={'py-4 align-top tabular-nums border-t border-t-foreground-secondary'}>
            {areaInfo.team}
            {#if areaInfo.team == 1}
              {t('proposals.estimates.person')}
            {:else}
              {t('proposals.estimates.people')}
            {/if}
          </td>
          <!-- Total Duration Cell -->
          <td
            class={'lg:pl-12 pl-4 py-4  align-top text-right font-bold tabular-nums pr-4 md:pr-0 border-t border-t-foreground-secondary'}
          >
            {areaInfo.duration}
          </td>
          <!-- Total Predicted Cost Cell -->
          <td
            class={clsx(
              getStickyColClassName(),
              getContainersPaddingClassName('right'),
              'lg:pl-12 pl-4 py-4 lg:pr-0',
              'align-top text-right font-bold tabular-nums',
              'border-t border-t-foreground-secondary',
              i % 2 ? 'bg-background-offset' : 'bg-background'
            )}
          >
            <div class="w-px bg-foreground-tertiary md:w-0 absolute left-0 top-0 bottom-0" />
            {formatter.format(areaInfo.cost)}
          </td>
        </tr>
      {/each}
      <!-- TOTAL SUMS -->
      <tr class={'border-b border-foreground-tertiary bg-background'}>
        <td rowspan="3"> </td>
        <td rowspan="3"> </td>
        <!-- Subtotal Label Cell -->
        <td class={'py-4 align-top'}>
          {t('proposals.estimates.subtotal')}
        </td>
        <!-- Total Duration Cell -->
        <td class={'lg:pl-12 pl-4 py-4 pr-4 md:pr-0 align-top text-right tabular-nums'}>
          {totalDuration}
        </td>
        <!-- Subtotal Cell -->
        <td
          class={clsx(
            getStickyColClassName(),
            getContainersPaddingClassName('right'),
            'lg:pl-12 pl-4 py-4 lg:pr-0',
            'align-top text-right tabular-nums'
          )}
        >
          <div class="w-px bg-foreground-tertiary md:w-0 absolute left-0 top-0 bottom-0" />
          {formatter.format(subtotal)}
        </td>
        <!-- Empty Cell -->
        <td class="hidden lg:table-cell" rowspan="3"> </td>
      </tr>
      {#if discount}
        <tr class={'border-b border-foreground-tertiary bg-background'}>
          <!-- Discount Label Cell -->
          <td class={clsx('py-4  align-top')}>
            <div class="flex gap-2 items-center">
              <p>{t('proposals.estimates.discount')}</p>
              <Tag class="cursor-default" label={discount + '%'} />
            </div>
          </td>
          <!-- - Cell -->
          <td class={'lg:pl-12 pl-4 py-4 pr-4 md:pr-0 align-top text-right'}> - </td>
          <!-- Discount Cell -->
          <td
            class={clsx(
              getStickyColClassName(),
              getContainersPaddingClassName('right'),
              'lg:pl-12 pl-4 py-4 lg:pr-0 align-top text-right',
              'tabular-nums'
            )}
          >
            <div class="w-px bg-foreground-tertiary md:w-0 absolute left-0 top-0 bottom-0" />
            {formatter.format(discountedValue)}
          </td>
        </tr>
      {/if}
      <tr class={'border-b border-foreground-tertiary bg-background'}>
        <!-- Grand Total Label Cell -->
        <td class={clsx('py-4  align-top font-bold')}>
          {t('proposals.estimates.grand-total')}
        </td>
        <!-- Total Duration Cell -->
        <td class={'lg:pl-12 pl-4 py-4 align-top text-right font-bold tabular-nums pr-4 md:pr-0'}>
          {totalDuration}
        </td>
        <!-- Grand Total Cell -->
        <td
          class={clsx(
            getStickyColClassName(),
            getContainersPaddingClassName('right'),
            'lg:pl-12 pl-4 py-4 lg:pr-0',
            'font-bold tabular-nums align-top text-right'
          )}
        >
          <div class="w-px bg-foreground-tertiary md:w-0 absolute left-0 top-0 bottom-0" />
          {formatter.format(grandTotal)}
        </td>
      </tr>
    </tbody>
  </table>
</div>
