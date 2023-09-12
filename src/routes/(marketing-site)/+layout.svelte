<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';
  import ImageGallery from '$components/image-gallery.svelte';
  import TopNavigation from '$components/top-navigation.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import Footer from '$components/footer.svelte';

  export let data;
</script>

<PageDrawer />
<ImageGallery />
<TopNavigation
  configuration={data.configuration.content}
  variant={$page.url.pathname.startsWith('/handbook') ? 'handbook' : 'default'}
/>
<slot />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}
