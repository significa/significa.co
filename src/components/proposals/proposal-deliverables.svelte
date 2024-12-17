<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';

  import type { ProposalDeliverableStoryblok } from '$types/bloks';

  export let data: ProposalDeliverableStoryblok[];
  export let showManpower = true;

  $: totalManpower = data.reduce((acc, entry) => (acc += +entry.manpower), 0);
</script>

<div class="mt-10 overflow-x-scroll md:mt-14 lg:mt-20">
  <div class="min-w-[780px] border-b border-foreground-secondary">
    <div
      class={clsx(
        'container mx-auto px-container py-2',
        'grid grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12'
      )}
    >
      <p class="text-2xs uppercase text-foreground-secondary">
        {t('proposals.scope.deliverable')}
      </p>

      <p class="text-2xs uppercase text-foreground-secondary">
        {t('proposals.scope.service')}
      </p>

      {#if showManpower}
        <p class="text-right text-2xs uppercase text-foreground-secondary">
          {t('proposals.deliverables.manpower')}
        </p>
      {/if}
    </div>
  </div>

  <div>
    {#each data as entry}
      <div
        class="min-w-[780px] border-b border-foreground-tertiary last:border-foreground-secondary"
      >
        <div
          class={clsx(
            'container px-container md:mx-auto',
            'grid grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12'
          )}
        >
          <div class="my-4 -ml-3.5">
            <p class="text-sm font-bold">
              <span
                style="background-color: {entry.color}"
                class="mr-1 inline-block h-2 w-2 rounded-full"
              ></span>
              {entry.title}
            </p>
            <p class="ml-3.5 text-sm text-foreground-secondary">
              {entry.description}
            </p>
          </div>

          <div>
            {#each entry.services || [] as service}
              <div class="my-4">
                <p class="text-sm font-bold">
                  {service.title}
                </p>
                <p class="max-w-[28rem] text-sm text-foreground-secondary">
                  {service.description}
                </p>
              </div>
            {/each}
          </div>

          {#if showManpower}
            <p class="my-4 text-right text-sm">
              {entry.manpower}
              {+entry.manpower > 1 ? t('proposals.months') : t('proposals.month')}
            </p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if showManpower}
    <div class="min-w-[780px] bg-background-offset/50">
      <div
        class={clsx(
          'px-container md:container md:mx-auto',
          'flex items-baseline justify-end gap-x-2 py-2 font-semibold'
        )}
      >
        <span class="text-2xs font-normal uppercase text-foreground-secondary"
          >{t('proposals.deliverables.total')}</span
        >
        <span>
          {totalManpower}
          {totalManpower > 1 ? t('proposals.months') : t('proposals.month')}
        </span>
      </div>
    </div>
  {/if}
</div>
