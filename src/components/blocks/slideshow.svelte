<script lang="ts">
  import type { SlideshowStoryblok } from '$types/bloks';
  import { getImageAttributes } from '$lib/utils/cms';

  import { onMount } from 'svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  let y = 0;
  let eased = 0;

  const ease = () => {
    eased = eased + (y - eased) * 0.075;
    frame = window.requestAnimationFrame(ease);
  };

  let frame: number;
  onMount(() => {
    frame = window.requestAnimationFrame(ease);
    return () => {
      window.cancelAnimationFrame(frame);
    };
  });

  export let block: SlideshowStoryblok;
</script>

<svelte:window bind:scrollY={y} />

<div
  use:storyblokEditable={block}
  class={'flex justify-center overflow-hidden border-b py-8 md:py-20'}
>
  <div class="flex gap-10" style="transform: translateX(calc({eased / 5}px * -1 + 15vw))">
    {#each block.images || [] as img}
      {#if img?.filename}
        {@const { src, alt, width, height } = getImageAttributes(img)}
        <img class="max-h-96 rounded-md object-cover" {alt} {src} {width} {height} />
      {/if}
    {/each}
  </div>
</div>
