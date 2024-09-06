<script lang="ts">
  import HandbookIndexPage from '$components/pages/handbook/index-page/handbook-index.svelte';

  export let data;

  const { chapters } = data;
</script>

<HandbookIndexPage {chapters} />
