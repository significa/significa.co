<script lang="ts">
  import '$styles/index.css';
  import HandbookNavigation from '$components/handbook-navigation.svelte';
  import PageDrawer from '$components/page-drawer.svelte';

  export let data;
</script>

<HandbookNavigation configuration={data.configuration.content} />

<PageDrawer />

<slot />
