<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import { startStoryblokBridge } from '$lib/storyblok';

  import type { PageData } from './$types';

  export let data: PageData;

  startStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));

  const blockWidths: Record<string, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'w-full'
  };
</script>

{#key data.story.uuid}
  <div class="container">
    <h1>Project header here for {data.story.name}</h1>
    {#if data.story.content.body}
      <RichText
        class="my-20"
        doc={data.story.content.body}
        getAttributes={(_, block) => ({
          class: `mx-auto ${blockWidths[block?.width || 'narrow']}`
        })}
      />
    {/if}
  </div>
{/key}
