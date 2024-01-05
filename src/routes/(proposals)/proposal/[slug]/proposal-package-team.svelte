<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';
  import type {
    ProposalTeamEntryStoryblok,
    ProposalPackageEntryStoryBlok,
    ProposalDepartmentStoryblok
  } from '$types/bloks';
  import {
    getColumnsWidthClassName,
    getContainersPaddingClassName,
    getHeaderCellTextClassName
  } from '$lib/utils/proposalTables';
  import { Link } from '@significa/svelte-ui';
  import { drawerLinks } from '$lib/actions/drawer-links';

  export let data: ProposalTeamEntryStoryblok[] | ProposalPackageEntryStoryBlok[];
  export let windowWidth: number;
  export let containerMargin: number;
  export let sectionTitleWidth: number;

  let firstColWidth: number;
  let lastColWidth: number;
  let lastColContentWidth: number;
  let emptyColWidth: number;

  $: centralColsWidth = (windowWidth - firstColWidth - lastColWidth - emptyColWidth) / 2;

  let rateMaxCharacters = Math.max(...data.map((a) => a.rate_value?.length || 0));
  lastColContentWidth = Math.max((rateMaxCharacters * 135) / 4.5, 175);

  let dataMap = new Map();
  let departmentsInfo: ProposalDepartmentStoryblok[] = [];

  data.forEach(({ department, ...entryNoDepartment }) => {
    if (dataMap.has(department.name)) {
      dataMap.set(department.name, [...dataMap.get(department.name), entryNoDepartment]);
    } else {
      dataMap.set(department.name, [entryNoDepartment]);
      departmentsInfo.push(department);
    }
  });
</script>

<div
  class="overflow-x-scroll md:overflow-hidden"
  style="--container-margin: {containerMargin}px;
    --section-title-width: {sectionTitleWidth}px;
    --central-cols-width: {centralColsWidth}px;
    --sticky-col-content-width: {lastColContentWidth}px;"
>
  <table class="table-fixed w-[750px] md:w-full">
    <thead>
      <tr class="border-b border-foreground-secondary">
        <th
          class={clsx(
            getContainersPaddingClassName('left'),
            getColumnsWidthClassName('first'),
            'py-2.5 pr-4 lg:pr-12'
          )}
          bind:clientWidth={firstColWidth}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.team.department')}
          </p></th
        >
        <th class={clsx(getColumnsWidthClassName('central'), 'py-2.5 pr-4 lg:pr-12')}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.team.team-member')}
          </p></th
        >
        <th class={clsx(getColumnsWidthClassName('central'), 'pr-4 lg:pr-12 py-2.5')}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>{t('proposals.team.role')}</p></th
        >
      </tr>
    </thead>
    <tbody>
      {#each departmentsInfo as department, j}
        {#each dataMap.get(department.name) as entry, i}
          <tr
            class={clsx(
              'border-b border-foreground-tertiary',
              j % 2 ? 'bg-background-offset' : 'bg-background'
            )}
          >
            {#if i == 0}
              <td
                rowspan={dataMap.get(department.name).length}
                class={clsx(getContainersPaddingClassName('left'), 'py-4 align-top pr-4 lg:pr-12')}
              >
                <p class="font-bold">
                  {department.content.title}.
                </p>
                <p class="text-foreground-secondary">
                  {department.content.description}
                </p>
              </td>
            {/if}

            <td class="py-4 align-top pr-4 lg:pr-12">
              <div class="flex flex-wrap gap-2" use:drawerLinks>
                <Link href={`/about/${entry.team_member.member?.slug}`}>
                  {entry.team_member.member.name}
                </Link>
              </div>
            </td>

            <td class={'pr-4 lg:pr-12 py-4 align-top'}>
              <div>
                <p class="font-bold">
                  {entry.role[0].title}
                </p>
                <p class="text-foreground-secondary">
                  {entry.role[0].description}
                </p>
              </div>
            </td>
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>
