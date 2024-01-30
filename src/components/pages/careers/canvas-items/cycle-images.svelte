<script lang="ts">
  import clsx from 'clsx';

  export let images: string[];
  export let alt = 'canvas element';
  export let top: number | undefined;
  export let left: number | undefined;
  export let rotate: number | undefined;

  let active = 0;

  function next() {
    active = (active + 1) % images.length;
  }
</script>

<button on:click={next}>
  <img
    {alt}
    src={images[active]}
    draggable="false"
    class={clsx('drop-shadow-sm', $$restProps.class)}
    style="left: {left || 0}px; top: {top || 0}px; transform: rotate({rotate || 0}deg)"
  />
</button>
