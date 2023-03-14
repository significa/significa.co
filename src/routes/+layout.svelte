<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import TopNavigation from '$components/top-navigation.svelte';
  import PageDrawer from '$components/page-drawer.svelte';

  export let data;
</script>

<svelte:head>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="googlebot" content="noindex,nofollow" />
</svelte:head>

<PageDrawer />
<DraftMode />
<ImageGallery />
<TopNavigation
  configuration={data.configuration}
  variant={$page.url.pathname.startsWith('/handbook') ? 'handbook' : 'default'}
/>
<slot />
<footer class="container mt-20 py-20">Footer here</footer>
