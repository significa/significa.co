<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';

  import type { ProposalDeliverableStoryblok } from '$types/bloks';

  export let data: ProposalDeliverableStoryblok[];
  export let showManpower = true;

  $: totalManpower = data.reduce((acc, entry) => (acc += +entry.manpower), 0);
</script>

<div class="overflow-x-scroll mt-10 md:mt-14 lg:mt-20">
  <div class="border-b border-foreground-secondary min-w-[780px]">
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
        <p class="text-2xs uppercase text-foreground-secondary text-right">
          {t('proposals.deliverables.manpower')}
        </p>
      {/if}
    </div>
  </div>

  <div>
    {#each data as entry}
      <div
        class="border-b border-foreground-tertiary last:border-foreground-secondary min-w-[780px]"
      >
        <div
          class={clsx(
            'container md:mx-auto px-container',
            'grid grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12'
          )}
        >
          <div class="-ml-3.5 my-4">
            <p class="text-sm font-bold">
              <span
                style="background-color: {entry.color}"
                class="w-2 h-2 mr-1 rounded-full inline-block"
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
                <p class="text-sm text-foreground-secondary max-w-[28rem]">
                  {service.description}
                </p>
              </div>
            {/each}
          </div>

          {#if showManpower}
            <p class="my-4 text-sm text-right">
              {entry.manpower}
              {+entry.manpower > 1 ? t('proposals.months') : t('proposals.month')}
            </p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if showManpower}
    <div class="bg-background-offset/50 min-w-[780px]">
      <div
        class={clsx(
          'md:container md:mx-auto px-container',
          'flex gap-x-2 py-2 justify-end items-baseline font-semibold'
        )}
      >
        <span class="font-normal text-2xs uppercase text-foreground-secondary"
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
