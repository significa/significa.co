<script lang="ts">
  import { TrackingEvent } from '$lib/track';
  import type { CanvasEggStoryblok } from '$types/bloks';
  import CycleImages from './cycle-images.svelte';

  export let item: CanvasEggStoryblok;
  const eggs = Object.values(
    import.meta.glob('../../../../assets/eggs/*.svg', { eager: true, as: 'url' })
  );
</script>

<CycleImages
  images={eggs}
  top={item.top}
  left={item.left}
  rotate={item.rotate}
  alt="Egg"
  trackEvent={{ event: TrackingEvent.CAREERS_CANVAS_EGG_FRY }}
/>
