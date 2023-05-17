<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { CareersPageStoryblok, GetAQuotePageStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { onMount } from 'svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let images: GetAQuotePageStoryblok['images'] | CareersPageStoryblok['images'];

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
</script>

<svelte:window bind:scrollY={y} />

<div class={clsx('flex justify-center overflow-hidden border-b', className)} {...$$restProps}>
  <div class="flex gap-10" style="transform: translateX(calc({eased / 5}px * -1 + 15vw))">
    {#each images || [] as img}
      {#if img?.filename}
        {@const { src, alt, width, height } = getImageAttributes(img)}
        <img class="max-h-96 rounded-md object-cover" {alt} {src} {width} {height} />
      {/if}
    {/each}
  </div>
</div>
