<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import TopNavigation from '$components/top-navigation.svelte';
</script>

<svelte:head>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="googlebot" content="noindex,nofollow" />
</svelte:head>

<DraftMode />
<ImageGallery />
<TopNavigation />
<slot />
