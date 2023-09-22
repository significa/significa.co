<script lang="ts">
  import { t } from '$lib/i18n';
  import clsx from 'clsx';
  import {
    getColumnsWidthClassName,
    getContainersPaddingClassName,
    getHeaderCellTextClassName
  } from '$lib/utils/proposalTables';
  import type { ProposalScopeEntryStoryblok } from '$types/bloks';
  import { Button, Tag } from '@significa/svelte-ui';
  import { fade, slide } from 'svelte/transition';
  import { circOut } from 'svelte/easing';

  export let data: ProposalScopeEntryStoryblok[];
  export let windowWidth: number;
  export let containerMargin: number;
  export let sectionTitleWidth: number;

  let isShowingFeatures = Array(data.length).fill(false);

  let lastColWidth: number;
  let firstColWidth: number;

  $: centralColsWidth = (windowWidth - lastColWidth - firstColWidth) / 2;
</script>

<div
  class="overflow-x-scroll md:overflow-hidden"
  style="--container-margin: {containerMargin}px;
  --section-title-width: {sectionTitleWidth}px;
  --central-cols-width: {centralColsWidth}px;
  --last-col-content-width: 100px;"
>
  <table class="table-fixed w-[750px] md:w-full">
    <thead>
      <tr class="border-b border-foreground-secondary">
        <!-- Delivarable Column -->
        <th
          class={clsx(
            getContainersPaddingClassName('pl'),
            getColumnsWidthClassName('first'),
            'py-2.5'
          )}
          bind:clientWidth={firstColWidth}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.scope.delivarable')}
          </p></th
        >
        <!-- Service Column-->
        <th class={clsx(getColumnsWidthClassName('central'), 'pl-4 lg:pl-12 py-2.5')}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.scope.service')}
          </p></th
        >
        <!-- Features Column-->
        <th
          class={clsx(
            getColumnsWidthClassName('central'),
            'pl-4 lg:pl-12 py-2.5 lg:pr-0',
            getContainersPaddingClassName('pr')
          )}
          ><p class={clsx(getHeaderCellTextClassName('left'))}>
            {t('proposals.scope.features')}
          </p></th
        >
        <!-- Show Column -->
        <th
          class={clsx(
            getContainersPaddingClassName('pr'),
            getColumnsWidthClassName('last'),
            'hidden lg:block pl-4 lg:pl-12 py-2.5'
          )}
          bind:clientWidth={lastColWidth}
        ></th>
      </tr>
    </thead>
    <tbody>
      {#each data as entry, i}
        {@const features = entry.features?.split('\n').filter(Boolean) || []}
        <tr class="border-b border-foreground-tertiary even:bg-background-offset">
          <!-- Delivarable Cell -->
          <td class={clsx(getContainersPaddingClassName('pl'), 'py-4 align-top')}>
            <p class="font-bold">
              {entry.title}.
            </p>
            <p class="text-foreground-secondary">
              {entry.description}
            </p>
            <Button
              class="lg:hidden block mt-3"
              variant="secondary"
              size="sm"
              on:click={() => {
                isShowingFeatures[i] = !isShowingFeatures[i];
              }}
            >
              {isShowingFeatures[i] ? t('proposals.hide') : t('proposals.show')}
            </Button>
          </td>
          <!-- Service Cell -->
          <td class="pl-4 lg:pl-12 py-4 align-top">
            <div class="flex flex-wrap gap-2">
              {#each entry.services || [] as service}
                <Tag class="cursor-default" label={service} />
              {/each}
            </div>
          </td>
          <!-- Features Cell -->
          <td class={clsx(getContainersPaddingClassName('pr'), 'pl-4 lg:pl-12 align-top lg:pr-0')}>
            <p
              class={clsx(
                'border-t border-foreground-secondary py-4 -mt-0.5 transition-colors',
                isShowingFeatures[i] ? 'text-foreground-secondary' : ''
              )}
            >
              {t('proposals.scope.multiple-features')}
            </p>
            {#if isShowingFeatures[i]}
              <div transition:slide={{ duration: 400, easing: circOut }}>
                {#each features as feature}
                  <p
                    transition:fade|global={{ duration: 200 }}
                    class="py-4 border-b last:border-none"
                  >
                    {feature}
                  </p>
                {/each}
              </div>
            {/if}
          </td>
          <!-- Show Cell -->
          <td
            class={clsx(
              getContainersPaddingClassName('pr'),
              'hidden lg:block pl-4 lg:pl-12 align-top text-right py-4'
            )}
            ><Button
              variant="secondary"
              size="sm"
              class="w-16"
              on:click={() => {
                isShowingFeatures[i] = !isShowingFeatures[i];
              }}
            >
              {isShowingFeatures[i] ? t('proposals.hide') : t('proposals.show')}
            </Button></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
