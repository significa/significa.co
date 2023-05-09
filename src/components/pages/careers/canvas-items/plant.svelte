<script lang="ts">
  import type { CanvasPlantStoryblok } from '$types/bloks';
  import CycleImages from './cycle-images.svelte';

  export let item: CanvasPlantStoryblok;
  const plants = Object.values(
    import.meta.glob('../../../../assets/plants/*.svg', { eager: true, as: 'url' })
  );
</script>

<CycleImages images={plants} top={item.top} left={item.left} rotate={item.rotate} alt="Plant" />
