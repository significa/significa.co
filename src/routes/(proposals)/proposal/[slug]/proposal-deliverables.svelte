<script lang="ts">
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import {
    getColumnsWidthClassName,
    getContainersPaddingClassName,
    getHeaderCellTextClassName
  } from '$lib/utils/proposalTables';
  import type { ProposalDeliverableStoryblok } from '$types/bloks';

  export let data: ProposalDeliverableStoryblok[];
  export let windowWidth: number;
  export let containerMargin: number;
  export let sectionTitleWidth: number;

  let lastColWidth: number;
  let firstColWidth: number;

  $: centralColsWidth = (windowWidth - lastColWidth - firstColWidth) / 2;
</script>

<div
  class="overflow-x-scroll md:overflow-hidden"
  style="--container-margin: {containerMargin}px;
  --section-title-width: {sectionTitleWidth}px;
  --central-cols-width: {centralColsWidth}px;
  --last-col-content-width: 75px;"
>
  <table class="table-fixed w-[750px] md:w-full">
    <thead>
      <tr class="border-b border-foreground-secondary">
        <!-- Deliverable Column -->
        <th
          class={clsx(
            getContainersPaddingClassName('left'),
            getColumnsWidthClassName('first'),
            'pr-4 lg:pr-12 py-2.5'
          )}
          bind:clientWidth={firstColWidth}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.scope.deliverable')}
          </p>
        </th>

        <!-- Service Column-->
        <th class={clsx(getColumnsWidthClassName('central'), 'pr-4 lg:pr-12 py-2.5')}>
          <p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.scope.service')}
          </p>
        </th>

        <!-- Manpower Column-->
        <th
          class={clsx(
            getColumnsWidthClassName('last'),
            'lg:pr-12 py-2.5',
            getContainersPaddingClassName('right'),
            getColumnsWidthClassName('last')
          )}
        >
          <p class={clsx(getHeaderCellTextClassName('left'))}>Estimated Manpower</p>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each data as deliverable}
        <tr class="border-b border-foreground-tertiary even:bg-background-offset">
          <!-- Deliverable Cell -->
          <td class={clsx(getContainersPaddingClassName('left'), 'py-4 pr-4 lg:pr-12 align-top')}>
            <p class="font-bold">
              {deliverable.title}.
            </p>
            <p class="text-foreground-secondary">
              {deliverable.description}
            </p>
          </td>

          <!-- Service Cell -->
          <td class="pr-4 lg:pr-12 py-4 align-top">
            {#each deliverable.services as service}
              <div class="pb-4">
                <p class="font-bold">
                  {service.title}.
                </p>
                <p class="text-foreground-secondary">
                  {service.description}
                </p>
              </div>
            {/each}
          </td>

          <!-- Manpower Cell -->
          <td class={clsx(getContainersPaddingClassName('right'), 'lg:pr-12 align-top')}>
            <p class="border-t border-foreground-secondary py-4 -mt-0.5 transition-colors">
              {deliverable.manpower} month(s)
            </p>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
