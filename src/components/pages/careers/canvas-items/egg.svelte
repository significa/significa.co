<script lang="ts">
  export let item: CanvasEggStoryblok;
  import type { CanvasEggStoryblok } from '$types/bloks';

  const eggs = Object.values(
    import.meta.glob('../../../../assets/eggs/*.svg', { eager: true, as: 'url' })
  );
  let active = 0;

  function next() {
    active = active < eggs.length - 1 ? active + 1 : eggs.length - 1;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate || 0}deg)"
  id="egg"
  alt=""
  src={eggs[active]}
  class="drop-shadow-sm"
  on:click={next}
/>
