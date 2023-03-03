<script lang="ts">
  import { richTextBlockWidths } from '$lib/constants';
  import type { ProjectStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import RichText from '$components/rich-text.svelte';

  export let story: ISbStoryData<ProjectStoryblok>;
</script>

<div class="container">
  <h1>Project header here for {story.name}</h1>
  {#if story.content.body}
    <RichText
      class="my-20"
      doc={story.content.body}
      getAttributes={(_, block) => ({
        class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
      })}
    />
  {/if}
</div>
