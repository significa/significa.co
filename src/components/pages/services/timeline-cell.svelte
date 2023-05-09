<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { theme } from '$lib/stores/theme';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ServiceTimelineCellStoryblok } from '$types/bloks';

  export let cell: ServiceTimelineCellStoryblok;
  export let needlePosition: number;
  export let scroll: number | undefined = undefined;
  export let throwConfeti: boolean;

  let node: HTMLElement;
  let p: number;

  // force re-render on scroll to get updated getBoundingClientRect() result of horziontal scrolling
  $: if (!scroll || scroll) {
    p = Math.min(
      100,
      Math.max(
        0,
        (needlePosition - node?.getBoundingClientRect().left) / node?.getBoundingClientRect().width
      ) * 100
    );
  }

  $: if (cell.throw_confetti && p > 0 && throwConfeti === false) {
    throwConfeti = true;
  } else if (cell.throw_confetti && p <= 0) {
    throwConfeti = false;
  }
</script>

<div
  bind:this={node}
  class="relative shrink-0"
  style="margin-left: {cell.left_offset || 0}px;"
  use:storyblokEditable={cell}
>
  {#if cell.before_dark?.filename && cell.before_light?.filename}
    {@const img = $theme === 'light' ? cell.before_light : cell.before_dark}
    {@const { width, height, src, alt } = getImageAttributes(img)}
    <div>
      <img
        {width}
        {height}
        {src}
        {alt}
        draggable="false"
        class="select-none"
        style="clip-path: polygon({p}% 0, 100% 0, 100% 100%, {p}% 100%)"
      />
      <p
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent text-sm font-semibold text-foreground"
        data-theme={cell.throw_confetti ? 'light' : 'dark'}
      >
        {cell.label}
      </p>
      {#if cell.decoration_dark?.filename && cell.decoration_dark.filename}
        {@const deco = $theme === 'light' ? cell.decoration_dark : cell.decoration_dark}
        {@const { width, height, src, alt } = getImageAttributes(deco)}
        <img
          {width}
          {height}
          {src}
          {alt}
          class="absolute left-1/2 top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2"
          style="min-width: {width}px; min-height:{height}px"
        />
      {/if}
    </div>
  {/if}

  {#if cell.after_dark?.filename && cell.after_light?.filename}
    {@const img = $theme === 'light' ? cell.after_light : cell.after_dark}
    {@const { width, height, src, alt } = getImageAttributes(img)}
    <div class="absolute inset-0" style="clip-path: polygon(0% 0, {p}% 0, {p}% 100%, 0% 100%)">
      <img {width} {height} {src} {alt} draggable="false" class="select-none" />
      <p
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent text-sm font-semibold text-foreground"
        data-theme="light"
      >
        {cell.label}
      </p>
    </div>
  {/if}
</div>
