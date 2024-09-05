<script lang="ts">
  import HandbookPage from '$components/pages/handbook/handbook-page/handbook-page.svelte';

  export let data;
</script>

<HandbookPage story={data.story} />
