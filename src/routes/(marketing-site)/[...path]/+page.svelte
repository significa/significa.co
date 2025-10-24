<script lang="ts">
  import DynamicPage from '$components/pages/dynamic-page.svelte';

  export let data;

  // Note: Storyblok bridge (live editing) not needed with WordPress
</script>

{#key data.page.story?.uuid}
  <DynamicPage page={data.page} />
{/key}
