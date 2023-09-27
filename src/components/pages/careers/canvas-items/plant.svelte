<script lang="ts">
  import { TrackingEvent } from '$lib/track';
  import type { CanvasPlantStoryblok } from '$types/bloks';
  import CycleImages from './cycle-images.svelte';

  export let item: CanvasPlantStoryblok;
  const plants = Object.values(
    import.meta.glob('../../../../assets/plants/*.svg', { eager: true, as: 'url' })
  );
</script>

<CycleImages
  images={plants}
  top={Number(item.top)}
  left={Number(item.left)}
  rotate={Number(item.rotate)}
  alt="Plant"
  trackEvent={{ event: TrackingEvent.CAREERS_CANVAS_GROW_PLANT }}
/>
