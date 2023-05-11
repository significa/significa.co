<script lang="ts">
  import { PlausibleEvents } from '$lib/plausible';
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
  plausibleEvent={{ event: PlausibleEvents.CAREERS_CANVAS_EGG_HATCH }}
/>
