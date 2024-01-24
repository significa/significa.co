<script lang="ts">
  import { t } from '$lib/i18n';
  import type { ProposalPackagePricingStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let data;
  export let type: string;
  export let pricing: ProposalPackagePricingStoryblok[] | undefined;

  const { deliverables, rows, totalDays, totalMonths } = data;

  let projectManagement = pricing?.find(
    (resource) => resource.department.name === 'Project Manager'
  );
  let qualityAssurance = pricing?.find(
    (resource) => resource.department.name === 'Quality Assurance'
  );
</script>

<div class="container mx-auto 2xl:px-12 mt-10 md:mt-14 lg:mt-20">
  <div class={clsx('relative overflow-x-scroll', 'grid grid-cols-[max-content,_max-content] py-3')}>
    <div class="col-start-1 row-start-1 border-b"></div>
    <div class="col-start-2">
      <div
        class="grid gap-1 pb-1 px-1 auto-cols-[20px] grid-rows-2 border-b shadow-sm"
        style="background: linear-gradient(to right, hsl(var(--color-border)) 1px, transparent 1px); background-size: 480px;"
      >
        {#each Array(totalMonths) as _, i}
          <div class="row-start-1 px-2 text-sm" style="grid-column: span 20">
            {t('proposals.timeline.month')}
            {i + 1}
          </div>
          {#each Array(4) as _, j}
            <div
              class="row-start-2 px-2 col-span-5 text-foreground-secondary text-[0.69rem] uppercase"
            >
              {t('proposals.timeline.week')}
              {j + 1}
            </div>
          {/each}
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
                'uppercase font-medium text-[0.69rem]/[0.88rem] text-foreground-secondary',
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

      {#if type === 'package' && pricing}
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
             background-size: 120px, auto;"
    >
      {#each rows as row, i}
        <div
          class={clsx(
            'rounded-xs mr-1 p-2 text-sm text-background',
            'overflow-hidden whitespace-nowrap hover:overflow-visible'
          )}
          style="
          background-color: {row.color};
          grid-row: {i + 1} / span 1;
          grid-column: {row.offset + 1} / span {row.duration};"
        >
          {#if row.title}
            {row.title}
            <span class="text-background/50">
              {row.duration}
              {t('proposals.days')}
            </span>
          {/if}
        </div>
      {/each}

      {#if type === 'package' && projectManagement && qualityAssurance}
        <div
          class="rounded-xs mx-1 p-2 text-sm border border-dashed"
          style="background-color: hsl(var(--color-background-offset));
               grid-row: {rows.length + 2} / span 1;
               grid-column: 1 / span {totalDays};"
        >
          {projectManagement.department.name}
          <span class="text-foreground/50"
            >~ {(20 * +projectManagement.rate_value * +projectManagement.team_size) / 100}
            {t('proposals.days-per-month')}</span
          >
        </div>
        <div
          class="rounded-xs mx-1 p-2 text-sm border border-dashed"
          style="background-color: hsl(var(--color-background-offset));
               grid-row: {rows.length + 3} / span 1;
               grid-column: 1 / span {totalDays};"
        >
          {qualityAssurance.department.name}
          <span class="text-foreground/50"
            >~ {(20 * +qualityAssurance.rate_value * +qualityAssurance.team_size) / 100}
            {t('proposals.days-per-month')}</span
          >
        </div>
      {/if}
    </div>
  </div>
</div>