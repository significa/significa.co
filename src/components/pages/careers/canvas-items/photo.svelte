<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { TimelineImageStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let item: TimelineImageStoryblok;
</script>

{#if item.image?.filename}
  {@const { src, alt, width, height } = getImageAttributes(item.image)}
  <div
    class={clsx('absolute', $$restProps.class)}
    style="width: {+width / 2}px; height: {+height / 2}px; left: {item.left ||
      0}px; top: {item.top || 0}px; transform: scale({item.scale || 1}) rotate({item.rotate ||
      0}deg)"
  >
    <img
      {src}
      {alt}
      {width}
      {height}
      draggable="false"
      class={clsx(item.border && 'border-[10px] border-white drop-shadow')}
    />
  </div>
{/if}
