<script lang="ts">
  import '$styles/index.css';
  import HandbookNavigation from '$components/handbook-navigation.svelte';

  export let data;
</script>

<HandbookNavigation configuration={data.configuration.content} />

<slot />
