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
    class="mt-10 grid grid-cols-[max-content,_max-content] overflow-x-scroll pb-3 md:mt-14 lg:mt-20"
  >
    <div class="col-start-1 row-start-1 border-b"></div>
    <div class="col-start-2">
      <div
        class="grid auto-cols-[20px] gap-1 border-b px-1 pb-1 shadow-sm"
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
      class="sticky left-0 row-start-2 flex flex-col justify-between p-1"
      style="background-image: linear-gradient(to bottom, hsl(var(--color-selection) / 0.02), hsl(var(--color-selection) / 0));"
    >
      <div>
        {#each deliverables as deliverable}
          <div
            class="mb-1 grid auto-rows-[36px] grid-cols-1 gap-y-1 rounded-xs border border-border bg-background shadow-sm"
          >
            <div
              class={clsx(
                'flex items-center px-3 py-2',
                'text-2xs font-medium uppercase text-foreground-secondary',
                'rounded-t-xs border-b border-border bg-background-offset/50'
              )}
            >
              <span
                style="background-color: {deliverable.color}"
                class="mr-2 inline-block h-2 w-2 rounded-full"
              ></span>
              {deliverable.title}
            </div>

            {#each deliverable?.rows as row}
              <div class="border-b px-3 py-2 text-sm last:border-0">{row.role}</div>
            {/each}
          </div>
        {/each}
      </div>

      {#if projectManagement && qualityAssurance}
        <div class="p-2">
          <hr />
        </div>
        <div
          class="grid-flow-row items-center rounded-xs border border-border bg-background shadow-md"
        >
          <div class="h-[37px] border-b px-3 py-2 text-sm">
            {projectManagement?.department.name}
          </div>
          <div class="h-[37px] px-3 py-2 text-sm">{qualityAssurance?.department.name}</div>
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
            'mr-1 rounded-xs p-1 text-sm text-background',
            'group overflow-hidden whitespace-nowrap hover:overflow-visible'
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
              class="hidden rounded-xs p-1 group-hover:inline-block"
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
            'mr-1 rounded-xs border border-dashed bg-background-offset p-1',
            'overflow-hidden whitespace-nowrap text-sm hover:overflow-visible'
          )}
          style="grid-row: {rows.length + 2} / span 1;
                 grid-column: 1 / span {totalDuration * 10};"
        >
          <p class="rounded-xs p-1 hover:inline-block hover:bg-background-offset/50">
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
            'mr-1 rounded-xs border border-dashed bg-background-offset p-1',
            'overflow-hidden whitespace-nowrap text-sm hover:overflow-visible'
          )}
          style="grid-row: {rows.length + 3} / span 1;
                 grid-column: 1 / span {totalDuration * 10};"
        >
          <p class="rounded-xs p-1 hover:inline-block hover:bg-background-offset/50">
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
    class="mt-10 grid grid-cols-[max-content,_max-content] overflow-x-scroll pb-3 md:mt-14 lg:mt-20"
  >
    <div class="col-start-1 row-start-1 border-b"></div>
    <div class="col-start-2">
      <div
        class="grid auto-cols-[20px] gap-1 border-b px-1 pb-1 shadow-sm"
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
      class="sticky left-0 row-start-2 flex flex-col justify-between p-1"
      style="background-image: linear-gradient(to bottom, hsl(var(--color-selection) / 0.02), hsl(var(--color-selection) / 0));"
    >
      <div>
        {#each deliverables as deliverable}
          <div
            class="mb-1 grid auto-rows-[36px] grid-cols-1 gap-y-1 rounded-xs border border-border bg-background shadow-sm"
          >
            <div
              class={clsx(
                'flex items-center px-3 py-2',
                'text-2xs font-medium uppercase text-foreground-secondary',
                'rounded-t-xs border-b border-border bg-background-offset/50'
              )}
            >
              <span
                style="background-color: {deliverable.color}"
                class="mr-2 inline-block h-2 w-2 rounded-full"
              ></span>
              {deliverable.title}
            </div>

            {#each deliverable?.rows as row}
              <div class="border-b px-3 py-2 text-sm last:border-0">{row.role}</div>
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
            'mr-1 rounded-xs p-1 text-sm text-background',
            'group overflow-hidden whitespace-nowrap hover:overflow-visible'
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
              class="hidden rounded-xs p-1 group-hover:inline-block"
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
