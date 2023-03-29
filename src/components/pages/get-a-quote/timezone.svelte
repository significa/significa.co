<script lang="ts">
  import Clock from '$components/clock.svelte';
  import clsx from 'clsx';
</script>

<div class="border-t border-border">
  <div class={clsx('container mx-auto px-container', 'lg:flex lg:items-center')}>
    <!-- Clock -->
    <div class="border-border lg:flex-1 lg:border-r">
      <div class={clsx('pt-12', 'md:pt-20', 'lg:pb-20')}>
        <Clock
          class={clsx(
            'mx-auto w-full px-10',
            'xs:w-96',
            'xl:w-[420px] xl:px-0',
            '2xl:mx-0 2xl:w-[564px]'
          )}
        />
      </div>
    </div>

    <!-- Text -->
    <div
      class={clsx(
        'mt-8 pb-12',
        'md:mt-12 md:pb-20',
        'lg:mt-0 lg:flex-1 lg:pb-0 lg:pl-12',
        'lg:flex lg:justify-end'
      )}
    >
      <div
        class={clsx(
          'text-xl text-foreground-secondary',
          'xs:text-2xl',
          'lg:max-w-xl',
          'xl:text-3xl',
          '2xl:text-4xl 2xl:font-normal'
        )}
      >
        <p>
          We are located in <span class="text-foreground">Porto, Portugal</span>
          and our working hours are between
          <span class="tabular-nums text-foreground">09:00</span>
          and
          <span class="tabular-nums text-foreground">18:00</span> (Europe / Lisbon). By being in a central
          timezone, same as London, we can easily provide overlap with both the US, Europe and Asia.
          However, experience has shown that having good asynchronous communication, not distance, is
          key to a successful partnership.
        </p>
      </div>
    </div>
  </div>
</div>
