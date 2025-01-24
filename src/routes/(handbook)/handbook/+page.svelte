<script lang="ts">
  import HandbookIndexPage from '$components/pages/handbook/index-page/handbook-index.svelte';

  export let data;

  const { hierarchy } = data;
</script>

<HandbookIndexPage {hierarchy} />
