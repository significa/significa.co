<script lang="ts">
  import clsx from 'clsx';

  const steps = [
    {
      title: 'Send us a message.',
      description: `You're at the right place. It all starts here. Use the form above to get everything started. `
    },
    {
      title: 'We will reach you in 48h.',
      description: `Unless something weird happens, like being invaded by aliens, we will get back to you in 2 working days.`
    },
    {
      title: 'Meet and proposing',
      description: `We meet. We scope. We issue a proposal. We negotiate. We discuss. We agree. We start. Simple.`
    },
    {
      title: 'Let’s collaborate!',
      description: `At this point, all the best is yet to come. We start working together and we deliver the best results. `
    }
  ];
</script>

<div class="border-t">
  <div class={clsx('container mx-auto px-container', 'lg:flex')}>
    <!-- Title -->
    <div class="lg:flex-1">
      <div class={clsx('max-w-md pt-12', 'md:pt-20', 'lg:max-w-sm')}>
        <h3 class="text-5xl text-foreground-secondary">What's next?</h3>
        <p class="text-5xl">What to expect</p>
      </div>
    </div>

    <!-- Steps -->
    <div
      class={clsx(
        'relative mt-12',
        'lg:flex lg:flex-1 lg:justify-end lg:pl-12',
        'lg:border-l lg:border-dashed'
      )}
    >
      <div class="absolute -left-px -top-32 hidden h-32 border-l lg:block" />
      <div>
        {#each steps as step, i}
          <div
            class="last:before:absolute last:before:-left-1 last:before:mt-4 last:before:h-full last:before:w-4 last:before:bg-background"
          >
            <span
              class={clsx(
                'mb-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-xs tabular-nums',
                'lg:absolute lg:-left-4'
              )}>{i + 1}</span
            >
            <div class="mb-12 max-w-xl text-xl xs:text-2xl">
              <h4 class="leading-tight">{step.title}</h4>
              <p class="mt-1 leading-tight text-foreground-secondary">
                {step.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
