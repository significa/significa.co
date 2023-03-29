<script lang="ts">
  import Clock from '$components/clock.svelte';
  import clsx from 'clsx';
</script>

<div class="border-t border-border">
  <div class={clsx('xl:flex xl:items-center', '2xl:container 2xl:mx-auto 2xl:px-container')}>
    <div
      class={clsx(
        'flex flex-1 items-center justify-center pt-12',
        'md:pt-20',
        'lg:pt-32',
        'xl:border-r xl:border-border xl:pb-32',
        '2xl:justify-start'
      )}
    >
      <Clock class={clsx('w-full px-10', 'xs:w-[420px]', 'sm:px-0', '2xl:w-[564px]')} />
    </div>
    <div
      class={clsx(
        'container mx-auto flex flex-1 px-container text-3xl text-foreground-secondary',
        'xl:px-0',
        '2xl:justify-end 2xl:px-0 2xl:text-4xl 2xl:font-normal'
      )}
    >
      <div
        class={clsx(
          'container pb-12 pt-12',
          'pt-20 md:pb-20',
          'lg:pb-32',
          'xl:p-24',
          '2xl:max-w-xl 2xl:p-0'
        )}
      >
        <p>
          We are located in <span class="text-foreground">Porto, Portugal</span>
          and our working hours are between
          <span class="tabular-nums text-foreground">09:00</span>
          and
          <span class="tabular-nums text-foreground">18:00</span> (Europe / Lisbon).
        </p>
        <p>
          By being in a central timezone, same as London, we can easily provide overlap with both
          the US, Europe and Asia. However, experience has shown that having good asynchronous
          communication, not distance, is key to a successful partnership.
        </p>
      </div>
    </div>
  </div>
</div>
