<script lang="ts">
  import { intersectionObserver } from '$lib/actions/instersection-observer';
  import type { VerticalListEntryStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';

  export let entry: VerticalListEntryStoryblok;

  let isVisible = false;
  const dispatch = createEventDispatcher<{ visible: HTMLDivElement }>();
</script>

<div
  use:intersectionObserver={[
    (entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && entry.target instanceof HTMLDivElement) dispatch('visible', entry.target);
    },
    { threshold: 0.5, rootMargin: '-43% 0%' }
  ]}
  class={clsx(
    isVisible && 'bg-background-offset md:bg-transparent',
    'py-4 mb-20 md:mb-0 md:py-16 items-center transition-all duration-300'
  )}
>
  <div class="flex-col container mx-auto px-container flex md:items-center md:flex-row">
    <p
      class={clsx(
        isVisible ? 'text-foreground' : 'text-foreground-tertiary',
        'text-5xl transition-all duration-300 md:w-1/2'
      )}
    >
      {entry.title}
    </p>
    <p
      class={clsx(
        isVisible ? 'opacity-1 text-foreground' : 'text-foreground-tertiary opacity-1 md:opacity-0',
        'md:text-foreground mt-2 text-2xl md:max-w-[560px] transition-all duration-300 md:w-1/2 md:mt-0'
      )}
    >
      {entry.description}
    </p>
  </div>
</div>
