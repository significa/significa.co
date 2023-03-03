<script lang="ts">
  import type { PageData } from './$types';
  import DynamicPage from '$components/pages/dynamic-page.svelte';
  import { startStoryblokBridge } from '$lib/storyblok';

  export let data: PageData;

  startStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));

  data.story.content.component;
</script>

{#key data.story.uuid}
  <DynamicPage story={data.story} />
{/key}
