<script lang="ts">
  import { track, type TrackingEventProps } from '$lib/track';
  import clsx from 'clsx';

  export let images: string[];
  export let alt = 'canvas element';
  export let top: number | undefined;
  export let left: number | undefined;
  export let rotate: number | undefined;
  export let trackEvent: TrackingEventProps | undefined = undefined;

  let active = 0;
  let hasMadeOneCycle = false;

  $: if (active === images.length - 1 && !hasMadeOneCycle && trackEvent) {
    track(trackEvent.event, trackEvent.options);
    hasMadeOneCycle = true;
  }

  function next() {
    active = (active + 1) % images.length;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
  {alt}
  src={images[active]}
  draggable="false"
  on:click={next}
  class={clsx('drop-shadow-sm', $$restProps.class)}
  style="left: {left || 0}px; top: {top || 0}px; transform: rotate({rotate || 0}deg)"
/>
