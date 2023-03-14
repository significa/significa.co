<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import TopNavigation from '$components/top-navigation.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import Footer from '$components/footer.svelte';

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
  configuration={data.configuration.content}
  variant={$page.url.pathname.startsWith('/handbook') ? 'handbook' : 'default'}
/>
<slot />
<Footer configuration={data.configuration.content} />
