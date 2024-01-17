<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';

  import type { ProposalDeliverableStoryblok } from '$types/bloks';

  export let data: ProposalDeliverableStoryblok[];

  $: totalManpower = data.reduce((acc, entry) => (acc += +entry.manpower), 0);
</script>

<div class="overflow-x-scroll">
  <div class="border-b border-foreground-secondary min-w-[780px]">
    <div
      class={clsx(
        'container mx-auto',
        'grid grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12 px-6 md:px-12 py-2'
      )}
    >
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">
        {t('proposals.scope.deliverable')}
      </p>

      <p class="text-xs uppercase tracking-wider text-foreground-secondary">
        {t('proposals.scope.service')}
      </p>

      <p class="text-xs uppercase tracking-wider text-foreground-secondary text-right">
        Estimated manpower
      </p>
    </div>
  </div>

  {#each data as entry}
    <div class="border-b border-foreground-secondary min-w-[780px]">
      <div
        class={clsx(
          'container md:mx-auto',
          'grid grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12 px-6 md:px-12 py-4',
          'even:bg-background-offset'
        )}
      >
        <div>
          <p class="font-bold">
            {entry.title}.
          </p>
          <p class="text-foreground-secondary">
            {entry.description}
          </p>
        </div>

        <div>
          {#each entry.services || [] as service}
            <div class="mb-4">
              <p class="font-bold">
                {service.title}.
              </p>
              <p class="text-foreground-secondary">
                {service.description}
              </p>
            </div>
          {/each}
        </div>

        <p class="text-right">{entry.manpower} month(s)</p>
      </div>
    </div>
  {/each}

  <div class="border-b border-border bg-background-tertiary/10 min-w-[780px]">
    <div
      class={clsx(
        'md:container md:mx-auto',
        'flex gap-x-2 px-6 md:px-12 py-2 justify-end font-bold'
      )}
    >
      <span
        class="font-normal text-xs uppercase tracking-wider text-foreground-secondary self-center"
        >Total</span
      >
      {totalManpower} months
    </div>
  </div>
</div>
