<script lang="ts">
  import type { CanvasPlantStoryblok } from '$types/bloks';

  export let item: CanvasPlantStoryblok;
  const plants = Object.values(
    import.meta.glob('../../../../assets/plants/*.svg', { eager: true, as: 'url' })
  );

  let active = 0;

  function next() {
    active = active < plants.length - 1 ? active + 1 : plants.length - 1;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate || 0}deg)"
  id="plant"
  alt=""
  src={plants[active]}
  class="drop-shadow-sm"
  on:click={next}
/>
