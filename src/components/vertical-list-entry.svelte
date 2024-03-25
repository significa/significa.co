<script lang="ts">
  import { intersectionObserver } from '$lib/actions/instersection-observer';
  import type { VerticalListEntryStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let entry: VerticalListEntryStoryblok;

  let isVisible = false;
</script>

<div
  use:intersectionObserver={[
    (entry) => (isVisible = entry.isIntersecting),
    { threshold: 0.5, rootMargin: '-20%' }
  ]}
  class="py-12 items-center transition-all hover:bg-background-offset"
>
  <div class="container mx-auto px-container flex justify-between">
    <p
      class={clsx(
        isVisible ? 'text-foreground' : 'text-foreground-tertiary',
        'text-5xl transition-all'
      )}
    >
      {entry.title}
    </p>
    <p
      class={clsx(isVisible ? 'opacity-1' : 'opacity-0', 'text-base max-w-[484px] transition-all')}
    >
      {entry.description}
    </p>
  </div>
</div>
