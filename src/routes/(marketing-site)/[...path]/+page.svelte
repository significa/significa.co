<script lang="ts">
  import DynamicPage from '$components/pages/dynamic-page.svelte';
  import { startStoryblokBridge } from '$lib/storyblok';

  export let data;

  startStoryblokBridge(data.page.story?.id, (newStory) => {
    data.page.story = newStory;
  });
</script>

{#key data.page.story?.uuid}
  <DynamicPage page={data.page} />
{/key}
