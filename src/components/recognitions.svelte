<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { RecognitionEntryStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import Heading from './heading.svelte';
  import type { HeadingLevel } from '$lib/heading-level';

  export let recognitions: ISbStoryData<RecognitionEntryStoryblok>[];
  /** Level of the recognition labels. Defaults to the current heading scope. */
  export let level: HeadingLevel | undefined = undefined;
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
      <Heading
        {level}
        visual={4}
        class="text-xs uppercase tracking-wider text-foreground-secondary"
      >
        {label}
      </Heading>
      <p class="text-sm font-medium">{title}</p>
    </div>
  </div>
{/each}
