<script lang="ts">
  import { tweened } from 'svelte/motion';

  import { intersectionObserver } from '$lib/actions/intersection-observer';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ComparisonStoryblok } from '$types/bloks';
  import { Icon } from '@significa/svelte-ui';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: ComparisonStoryblok;

  let handle: HTMLButtonElement;
  let container: HTMLDivElement;
  let dragging = false;
  // using a tweened instead of a value to have a smooth transition when moving it programatically (when the element gets in the viewport)
  let visibility = tweened(0, { duration: 0, easing: (t) => t });

  const onDrag = (e: MouseEvent) => {
    if (!dragging) return;

    const { left, width } = container?.getBoundingClientRect();

    const relativeX = e.clientX - left;
    const target = (relativeX * 100) / width;

    visibility.set(Math.min(Math.max(target, 0), 100));
  };
</script>

<svelte:window
  on:mousedown={(e) => {
    if (e.target === handle) {
      dragging = true;
    }
  }}
  on:mouseup={() => (dragging = false)}
  on:mousemove={onDrag}
/>

<div
  class="not-rich-text my-6 md:my-10 relative overflow-hidden rounded-md"
  style="--comparison-visibility: {$visibility}%"
  use:storyblokEditable={block}
  data-theme="dark"
  bind:this={container}
  use:intersectionObserver={[
    ([e]) => {
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
    { threshold: [1] }
  ]}
>
  <!-- line -->
  <div
    class="absolute z-10 top-0 left-[calc(var(--comparison-visibility)-2px)] h-full w-1 bg-black"
  />
  <button
    aria-hidden="true"
    tabindex="-1"
    bind:this={handle}
    class="cursor-ew-resize absolute z-20 top-1/2 -translate-x-1/2 -translate-y-1/2 left-[var(--comparison-visibility)] w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md"
  >
    <Icon class="pointer-events-none" icon="comparison" />
  </button>
  {#if block.image_a?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image_a)}
    <img class="w-full h-auto" {src} {alt} {width} {height} />
  {/if}

  {#if block.image_b?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image_b)}
    <img
      class="absolute overflow-hidden inset-0 h-full w-[var(--comparison-visibility)] object-cover object-left"
      {src}
      {alt}
      {width}
      {height}
    />
  {/if}
</div>
