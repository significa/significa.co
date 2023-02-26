<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
</script>

<DraftMode />
<ImageGallery />
<slot />
