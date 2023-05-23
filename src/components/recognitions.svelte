<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';

  export let recognitions: {
    label: string;
    title: string;
    image: AssetStoryblok;
  }[];
  export let as: 'h2' | 'h3' | 'h4' = 'h4';
</script>

{#each recognitions as recognition}
  <div class="col-span-1 flex items-center">
    {#if recognition.image?.filename}
      {@const { alt, src, width, height } = getImageAttributes(recognition.image, {
        size: [120, 0]
      })}
      <img class="mr-2 h-auto w-14 rounded-md bg-background-offset" {src} {alt} {width} {height} />
    {/if}
    <div>
      <svelte:element this={as} class="text-xs uppercase tracking-wider text-foreground-secondary">
        {recognition.label}
      </svelte:element>
      <p class="text-sm font-medium">{recognition.title}</p>
    </div>
  </div>
{/each}
