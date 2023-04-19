<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import { onMount } from 'svelte';

  export let page: GetAQuotePageStoryblok;

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

<div class="flex justify-center overflow-hidden border-b py-12 md:py-20 lg:py-32">
  <div class="flex gap-10" style="transform: translateX(calc({eased / 5}px * -1 + 15vw))">
    {#each page.images || [] as img}
      {#if img?.filename}
        {@const { src, alt, width, height } = getImageAttributes(img)}
        <img class="max-h-96" {alt} {src} {width} {height} />
      {/if}
    {/each}
  </div>
</div>
