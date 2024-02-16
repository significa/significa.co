<script lang="ts">
  import HandbookPage from '$components/pages/handbook-page.svelte';

  export let data;
</script>

<HandbookPage path={data.path} />
