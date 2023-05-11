<script lang="ts">
  import { plausible, type PlausibleEventProps } from '$lib/plausible';
  import clsx from 'clsx';

  export let images: string[];
  export let alt = 'canvas element';
  export let top: number | undefined;
  export let left: number | undefined;
  export let rotate: number | undefined;
  export let plausibleEvent: PlausibleEventProps | undefined = undefined;

  let active = 0;
  let hasMadeOneCycle = false;

  $: if (active === images.length - 1 && !hasMadeOneCycle && plausibleEvent) {
    plausible(plausibleEvent.event, plausibleEvent.options);
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
