<script lang="ts">
  import type { CanvasYellowStickerStoryblok } from '$types/bloks';

  export let item: CanvasYellowStickerStoryblok;
</script>

<div
  data-theme="yellow"
  class="absolute h-[200px] w-[240px] bg-background p-4 drop-shadow-md"
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate || 0}deg)"
>
  <p class="text-base font-medium">{item.text}</p>
</div>
