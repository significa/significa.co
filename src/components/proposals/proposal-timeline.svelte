<script lang="ts">
  import { t } from '$lib/i18n';
  import { DAYS_PER_MONTH } from '$lib/utils/proposals';
  import type { ProposalPackagePricingStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let data;
  export let type: string;
  export let pricing: ProposalPackagePricingStoryblok[] | undefined;

  const { deliverables, rows, totalDuration } = data;

  let projectManagement = pricing?.find(
    (resource) => resource.department.name === 'Project Manager'
  );
  let qualityAssurance = pricing?.find(
    (resource) => resource.department.name === 'Quality Assurance'
  );

  const MONTH_WIDTH: number = 240;
  $: innerWidth = 0;
  $: minMonthDisplay = Math.ceil(innerWidth / MONTH_WIDTH - 1);
</script>

<svelte:window bind:innerWidth />

{#if type === 'package'}
  <div
    class="overflow-x-scroll grid grid-cols-[max-content,_max-content] mt-10 md:mt-14 lg:mt-20 pb-3"
  >
    <div class="col-start-1 row-start-1 border-b"></div>
    <div class="col-start-2">
      <div
        class="grid gap-1 pb-1 px-1 auto-cols-[20px] border-b shadow-sm"
        style="background: linear-gradient(to right, hsl(var(--color-border)) 1px, transparent 1px); background-size: {MONTH_WIDTH}px;"
      >
        {#each Array(Math.max(minMonthDisplay, Math.ceil(totalDuration + 1))) as _, i}
          <div class="row-start-1 px-2 text-sm" style="grid-column: span 10">
            {t('proposals.timeline.month')}
            {i + 1}
          </div>
        {/each}
      </div>
    </div>

    <div
      class="row-start-2 sticky left-0 p-1 flex flex-col justify-between"
      style="background-image: linear-gradient(to bottom, hsl(var(--color-selection) / 0.02), hsl(var(--color-selection) / 0));"
    >
      <div>
        {#each deliverables as deliverable}
          <div
            class="shadow-sm grid grid-cols-1 auto-rows-[36px] gap-y-1 rounded-xs border border-border bg-background mb-1"
          >
            <div
              class={clsx(
                'flex items-center px-3 py-2',
                'uppercase font-medium text-2xs text-foreground-secondary',
                'bg-background-offset/50 border-b border-border rounded-t-xs'
              )}
            >
              <span
                style="background-color: {deliverable.color}"
                class="w-2 h-2 mr-2 rounded-full inline-block"
              ></span>
              {deliverable.title}
            </div>

            {#each deliverable?.rows as row}
              <div class="text-sm px-3 py-2 border-b last:border-0">{row.role}</div>
            {/each}
          </div>
        {/each}
      </div>

      {#if projectManagement && qualityAssurance}
        <div class="p-2">
          <hr />
        </div>
        <div
          class="shadow-md items-center grid-flow-row rounded-xs border border-border bg-background"
        >
          <div class="h-[37px] border-b text-sm px-3 py-2">
            {projectManagement?.department.name}
          </div>
          <div class="h-[37px] text-sm px-3 py-2">{qualityAssurance?.department.name}</div>
        </div>
      {/if}
    </div>

    <div
      class="grid auto-cols-[20px] auto-rows-[36px] gap-1 p-1"
      style="background-image: linear-gradient(to right, hsl(var(--color-border)) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(var(--color-selection) / 0.02), hsl(var(--color-selection) / 0));
           background-size: {MONTH_WIDTH}px, auto;"
    >
      {#each rows as row, i}
        <div
          class={clsx(
            'rounded-xs mr-1 p-1 text-sm text-background',
            'overflow-hidden whitespace-nowrap group hover:overflow-visible'
          )}
          style="background-color: {row.color};
                 grid-row: {i + 1} / span 1;
                 grid-column: {row.offset * 10 + 1} / span {row.duration * 10};"
        >
          {#if row.title}
            <p class="p-1 group-hover:hidden">
              {row.title}
              <span class="text-background/50">
                {row.duration}
                {t('proposals.months')}
              </span>
            </p>

            <p
              class="p-1 hidden group-hover:inline-block rounded-xs"
              style="background-color: {row.color}80;"
            >
              {row.title}
              <span class="text-background/50">
                {row.duration}
                {t('proposals.months')}
              </span>
            </p>
          {/if}
        </div>
      {/each}

      {#if projectManagement && qualityAssurance}
        <div
          class={clsx(
            'rounded-xs mr-1 p-1 border border-dashed bg-background-offset',
            'text-sm whitespace-nowrap overflow-hidden hover:overflow-visible'
          )}
          style="grid-row: {rows.length + 2} / span 1;
                 grid-column: 1 / span {totalDuration * 10};"
        >
          <p class="p-1 rounded-xs hover:inline-block hover:bg-background-offset/50">
            {projectManagement.department.name}

            <span class="text-foreground/50"
              >~ {(DAYS_PER_MONTH * +projectManagement.rate_value * +projectManagement.team_size) /
                100}
              {t('proposals.days-per-month')}</span
            >
          </p>
        </div>
        <div
          class={clsx(
            'rounded-xs mr-1 p-1 border border-dashed bg-background-offset',
            'text-sm whitespace-nowrap overflow-hidden hover:overflow-visible'
          )}
          style="grid-row: {rows.length + 3} / span 1;
                 grid-column: 1 / span {totalDuration * 10};"
        >
          <p class="p-1 rounded-xs hover:inline-block hover:bg-background-offset/50">
            {qualityAssurance.department.name}

            <span class="text-foreground/50"
              >~ {(DAYS_PER_MONTH * +qualityAssurance.rate_value * +qualityAssurance.team_size) /
                100}
              {t('proposals.days-per-month')}</span
            >
          </p>
        </div>
      {/if}
    </div>
  </div>
{:else if type === 'rate'}
  <div
    class="overflow-x-scroll grid grid-cols-[max-content,_max-content] mt-10 md:mt-14 lg:mt-20 pb-3"
  >
    <div class="col-start-1 row-start-1 border-b"></div>
    <div class="col-start-2">
      <div
        class="grid gap-1 pb-1 px-1 auto-cols-[20px] border-b shadow-sm"
        style="background: linear-gradient(to right, hsl(var(--color-border)) 1px, transparent 1px); background-size: {MONTH_WIDTH}px;"
      >
        {#each Array(Math.max(minMonthDisplay, Math.ceil(totalDuration / 5 + 1))) as _, i}
          <div class="row-start-1 px-2 text-sm" style="grid-column: span 10">
            {t('proposals.timeline.week')}
            {i + 1}
          </div>
        {/each}
      </div>
    </div>

    <div
      class="row-start-2 sticky left-0 p-1 flex flex-col justify-between"
      style="background-image: linear-gradient(to bottom, hsl(var(--color-selection) / 0.02), hsl(var(--color-selection) / 0));"
    >
      <div>
        {#each deliverables as deliverable}
          <div
            class="shadow-sm grid grid-cols-1 auto-rows-[36px] gap-y-1 rounded-xs border border-border bg-background mb-1"
          >
            <div
              class={clsx(
                'flex items-center px-3 py-2',
                'uppercase font-medium text-2xs text-foreground-secondary',
                'bg-background-offset/50 border-b border-border rounded-t-xs'
              )}
            >
              <span
                style="background-color: {deliverable.color}"
                class="w-2 h-2 mr-2 rounded-full inline-block"
              ></span>
              {deliverable.title}
            </div>

            {#each deliverable?.rows as row}
              <div class="text-sm px-3 py-2 border-b last:border-0">{row.role}</div>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    <div
      class="grid auto-cols-[20px] auto-rows-[36px] gap-1 p-1"
      style="background-image: linear-gradient(to right, hsl(var(--color-border)) 1px, transparent 1px),
                         linear-gradient(to bottom, hsl(var(--color-selection) / 0.02), hsl(var(--color-selection) / 0));
       background-size: {MONTH_WIDTH}px, auto;"
    >
      {#each rows as row, i}
        <div
          class={clsx(
            'rounded-xs mr-1 p-1 text-sm text-background',
            'overflow-hidden whitespace-nowrap group hover:overflow-visible'
          )}
          style="background-color: {row.color};
             grid-row: {i + 1} / span 1;
             grid-column: {row.offset * 2 + 1} / span {row.duration * 2};"
        >
          {#if row.title}
            <p class="p-1 group-hover:hidden">
              {row.title}
              <span class="text-background/50">
                {row.duration}
                {t('proposals.days')}
              </span>
            </p>

            <p
              class="p-1 hidden group-hover:inline-block rounded-xs"
              style="background-color: {row.color}80;"
            >
              {row.title}
              <span class="text-background/50">
                {row.duration}
                {t('proposals.days')}
              </span>
            </p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
