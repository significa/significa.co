<script lang="ts">
  import HandbookPage from '$root/src/components/pages/handbook-page.svelte';

  export let data;
</script>

<HandbookPage path={data.path} />
