<script lang="ts">
  import { tweened } from 'svelte/motion';

  import { intersectionObserver } from '$lib/actions/intersection-observer';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ComparisonStoryblok } from '$types/bloks';
  import { Icon } from '@significa/svelte-ui';

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
  data-theme="dark"
  bind:this={container}
  style="--comparison-visibility: {$visibility}%"
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
  <div class="line" />
  <button aria-hidden="true" tabindex="-1" bind:this={handle} class="handle">
    <Icon icon="comparison" />
  </button>
  {#if block.image_a?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image_a)}
    <img class="a" {src} {alt} {width} {height} />
  {/if}

  {#if block.image_b?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image_b)}
    <img class="b" {src} {alt} {width} {height} />
  {/if}
</div>

<style lang="postcss">
  div {
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius-md);
  }

  .b {
    position: absolute;

    overflow: hidden;
    inset: 0;

    height: 100%;
    width: var(--comparison-visibility);
    object-fit: cover;
    object-position: left center;
  }

  .line {
    position: absolute;
    z-index: 1;
    top: 0;
    left: calc(var(--comparison-visibility) - 2px);
    height: 100%;
    width: 4px;
    background-color: black;
  }

  .handle {
    all: unset;
    cursor: ew-resize;

    position: absolute;
    z-index: 2;
    top: 50%;
    left: var(--comparison-visibility);
    transform: translate(-50%, -50%);

    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--border-radius-full);
    background-color: var(--color-foreground);
    color: var(--color-background);

    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: var(--box-shadow-md);

    & :global(*) {
      /* disable pointer events to guarantee that a click in the handle is catched by our listener */
      pointer-events: none;
    }
  }
</style>
