<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';

  // Recognitions from WordPress (awards with recognition relationships)
  export let recognitions: any[];
  export let as: 'h2' | 'h3' | 'h4' = 'h4';
</script>

{#each recognitions as recognition}
  {#if recognition.acf?.recognition}
    {@const recData = recognition.acf.recognition}
    <div class="col-span-1 flex items-center">
      {#if recData.image?.url}
        {@const { alt, src, width, height } = getImageAttributes(recData.image, {
          size: [120, 0]
        })}
        <img class="mr-2 h-auto w-14 rounded-md bg-background-offset" {src} {alt} {width} {height} />
      {/if}
      <div>
        <svelte:element this={as} class="text-xs uppercase tracking-wider text-foreground-secondary">
          {recData.label || ''}
        </svelte:element>
        <p class="text-sm font-medium">{recData.title || ''}</p>
      </div>
    </div>
  {/if}
{/each}
