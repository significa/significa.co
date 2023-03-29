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

<div class="border-t border-border">
  <div class={clsx('container mx-auto px-container', 'lg:flex lg:justify-between')}>
    <div class={clsx('flex-1 py-12', 'md:py-20', 'lg:py-32')}>
      <div class="max-w-xl lg:pr-20">
        <h3 class="text-5xl text-foreground-secondary">What's next?</h3>
        <p class="text-5xl">Get to know our process a little better.</p>
      </div>
    </div>

    <div class="flex-1 lg:-ml-px">
      <div class="hidden h-32 border-l border-border lg:block" />
      {#each steps as step, i}
        <div
          class={clsx(
            'lg:relative lg:flex lg:justify-end lg:border-l lg:border-dashed lg:border-border lg:pl-24 lg:last:border-none'
          )}
        >
          <span
            class={clsx(
              'mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background tabular-nums',
              'lg:absolute lg:-left-4'
            )}>{i + 1}</span
          >
          <div class="max-w-xl pb-12 text-2xl font-normal">
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
