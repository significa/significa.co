<script lang="ts">
  import { TrackingEvent } from '$lib/track';
  import type { CanvasEggHatchingStoryblok } from '$types/bloks';
  import CycleImages from './cycle-images.svelte';

  export let item: CanvasEggHatchingStoryblok;
  const eggHatching = Object.values(
    import.meta.glob('../../../../assets/eggHatching/*.svg', { eager: true, as: 'url' })
  );
</script>

<CycleImages
  images={eggHatching}
  top={item.top}
  left={item.left}
  rotate={item.rotate}
  alt="Egg"
  trackEvent={{ event: TrackingEvent.CAREERS_CANVAS_EGG_HATCH }}
/>
