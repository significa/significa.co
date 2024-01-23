<script lang="ts">
  import type { GetAQuotePageStoryblok, StepsStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let page: GetAQuotePageStoryblok | StepsStoryblok;
  export let variant: undefined | 'block' | 'get-a-quote' = undefined;

  let lastItemHeight = 0;
</script>

<div class={clsx('border-t', variant === 'block' && 'border-t-0')}>
  <div class={clsx('container mx-auto px-container', 'lg:flex')}>
    <!-- Title -->
    <div class="lg:flex-1">
      <div class={clsx('max-w-md pt-12', 'md:pt-20', 'lg:max-w-sm')}>
        <h3 class="text-5xl text-foreground-secondary">{page.steps_title}</h3>
        <p class="text-5xl">{page.steps_subtitle}</p>
      </div>
    </div>

    <!-- Steps -->
    <div
      class={clsx(
        'relative mt-12',
        'md:mt-20',
        'lg:flex lg:flex-1 lg:justify-end lg:pl-12',
        'lg:border-l lg:border-dashed'
      )}
    >
      <div
        class="absolute -left-px -top-32 hidden h-32 border-l lg:block"
        style={variant === 'block'
          ? 'border-image: linear-gradient( to top, #2E2E2E 0%, rgba(46, 46, 46, 0.00) ) 1 100%;'
          : ''}
      />
      <div>
        {#each page.steps || [] as step, i}
          <div class="mb-12 last:mb-0">
            {#if i === (page.steps || []).length - 1}
              <div
                class="absolute -left-2 bottom-0 hidden w-4 bg-background lg:block"
                style="height: {lastItemHeight}px"
              />
            {/if}
            <span
              class={clsx(
                'mb-4 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-xs tabular-nums',
                'lg:absolute lg:-left-4'
              )}>{i + 1}</span
            >
            <div class="max-w-xl text-xl xs:text-2xl" bind:offsetHeight={lastItemHeight}>
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
