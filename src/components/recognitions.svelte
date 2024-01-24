<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { RecognitionEntryStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let recognitions: ISbStoryData<RecognitionEntryStoryblok>[];
  export let as: 'h2' | 'h3' | 'h4' = 'h4';
</script>

{#each recognitions as recognition}
  {@const { image, label, title } = recognition.content.recognition.content}
  <div class="col-span-1 flex items-center">
    {#if image?.filename}
      {@const { alt, src, width, height } = getImageAttributes(image, {
        size: [120, 0]
      })}
      <img class="mr-2 h-auto w-14 rounded-md bg-background-offset" {src} {alt} {width} {height} />
    {/if}
    <div>
      <svelte:element this={as} class="text-xs uppercase tracking-wider text-foreground-secondary">
        {label}
      </svelte:element>
      <p class="text-sm font-medium">{title}</p>
    </div>
  </div>
{/each}
