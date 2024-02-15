<script lang="ts">
  import { tweened } from 'svelte/motion';

  import { intersectionObserver } from '@significa/svelte-ui/actions';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ComparisonStoryblok } from '$types/bloks';
  import { CircleButton } from '@significa/svelte-ui';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import clsx from 'clsx';

  export let block: ComparisonStoryblok;

  let container: HTMLDivElement;
  let dragging = false;
  // using a tweened instead of a value to have a smooth transition when moving it programatically (when the element gets in the viewport)
  let visibility = tweened(0, { duration: 0, easing: (t) => t });

  const onDrag = (e: MouseEvent) => {
    const element = e.target as HTMLElement;
    if (!dragging || !container || element.parentElement !== container) return;

    const { left, width } = container.getBoundingClientRect();

    const relativeX = e.clientX - left;
    const target = (relativeX * 100) / width;

    visibility.set(Math.min(Math.max(target, 0), 100));
  };

  const onDragMobile = (e: TouchEvent) => {
    const element = e.target as HTMLElement;
    if (!dragging || !container || element.parentElement !== container) return;

    const { left, width } = container.getBoundingClientRect();

    const relativeX = e.targetTouches[0].clientX - left;
    const target = (relativeX * 100) / width;

    visibility.set(Math.min(Math.max(target, 0), 100));
  };
</script>

<svelte:window
  on:mousedown={(e) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('comparison-handler')) {
      dragging = true;
    }
  }}
  on:touchstart={(e) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('comparison-handler')) {
      dragging = true;
    }
  }}
  on:mouseup={() => (dragging = false)}
  on:mousemove={onDrag}
  on:touchmove={onDragMobile}
/>

<div
  class={clsx('not-rich-text relative my-8 overflow-hidden rounded-md md:my-14', $$restProps.class)}
  style="--comparison-visibility: {$visibility}%"
  use:storyblokEditable={block}
  bind:this={container}
  use:intersectionObserver={{
    callback: ([e]) => {
      // move the handle to the middle when the element gets in the viewport
      // to show the user that it's interactive
      if (e.isIntersecting && $visibility === 0) {
        setTimeout(() => {
          visibility.set(50, {
            duration: 500,
            easing: (t) => {
              // based on `elasticOut` easing function
              return Math.sin((-5.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -12.0 * t) + 1.0;
            }
          });
        }, 500);
      }
    },
    options: { threshold: [1] }
  }}
>
  <!-- line -->
  <div
    class="absolute left-[calc(var(--comparison-visibility)-2px)] top-0 z-10 h-full w-1 bg-black"
  />
  <CircleButton
    aria-hidden="true"
    class="comparison-handler absolute left-[var(--comparison-visibility)] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize bg-black text-white transition-none hover:opacity-100"
    icon="comparison"
  />
  {#if block.image_a?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image_a)}
    <img class="h-auto w-full" {src} {alt} {width} {height} />
  {/if}

  {#if block.image_b?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image_b)}
    <img
      class="absolute inset-0 h-full w-[var(--comparison-visibility)] overflow-hidden object-cover object-left"
      {src}
      {alt}
      {width}
      {height}
    />
  {/if}
</div>
