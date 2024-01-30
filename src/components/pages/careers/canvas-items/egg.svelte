<script lang="ts">
  import type { CanvasEggStoryblok } from '$types/bloks';
  import CycleImages from './cycle-images.svelte';

  export let item: CanvasEggStoryblok;
  const eggs = Object.values(
    import.meta.glob('../../../../assets/eggs/*.svg', { eager: true, as: 'url' })
  );
</script>

<CycleImages
  images={eggs}
  top={Number(item.top)}
  left={Number(item.left)}
  rotate={Number(item.rotate)}
  alt="Egg"
/>
