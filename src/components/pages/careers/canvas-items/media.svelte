<script lang="ts">
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';
  import type { CanvasMediaStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let item: CanvasMediaStoryblok;

  let video: HTMLVideoElement;
</script>

{#if item.image?.filename}
  {@const { src, alt, width, height } = getImageAttributes(item.image)}
  {@const calcWidth = width ? +width / 2 : item.width}
  {@const calcHeight = height ? +height / 2 : item.height}
  <div
    class={clsx('absolute', $$restProps.class)}
    style="width: {calcWidth}px; height: {calcHeight}px; left: {item.left || 0}px; top: {item.top ||
      0}px; transform: scale({item.scale || 1}) rotate({item.rotate || 0}deg)"
  >
    {#if VIDEO_EXTENSIONS.includes(getFileExtension(item.image.filename))}
      <video
        bind:this={video}
        muted
        playsinline
        src={item.image.filename}
        class={clsx(item.border && 'border-[10px] border-white drop-shadow-md', 'cursor-pointer')}
        on:click={() => video.play()}
      />
    {:else}
      <img
        {src}
        {alt}
        {width}
        {height}
        draggable="false"
        class={clsx(item.border && 'border-[10px] border-white drop-shadow-md')}
      />
    {/if}
  </div>
{/if}
