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
    { rootMargin: '-50%' }
  ]}
  class={clsx('mb-20 items-center py-4 transition-all duration-300 md:mb-0 md:py-16')}
>
  <div class="container mx-auto flex flex-col px-container md:flex-row md:items-center">
    <p
      class={clsx(
        isVisible ? 'text-foreground' : 'md:text-foreground-tertiary',
        'text-5xl transition-all duration-300 md:w-1/2'
      )}
    >
      {entry.title}
    </p>
    <p
      class={clsx(
        isVisible
          ? 'opacity-1 text-foreground'
          : 'md:opacity-1 md:text-foreground-tertiary md:opacity-0',
        'mt-2 text-2xl transition-all duration-300 md:mt-0 md:w-1/2 md:max-w-[560px] md:text-foreground'
      )}
    >
      {entry.description}
    </p>
  </div>
</div>
