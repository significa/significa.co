<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';
  import TopNavigation from '$components/top-navigation.svelte';
  import Footer from '$components/footer.svelte';

  export let data;
</script>

<TopNavigation configuration={data.configuration.content} />
<slot />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}
