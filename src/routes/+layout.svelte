<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import { toast, Toaster, ToastNotification } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';
  import { dev } from '$app/environment';
  import { page } from '$app/stores';

  beforeNavigate(() => {
    toast.clearAll();
  });
</script>

<svelte:head>
  {#if !dev && $page.data.version === 'published' && $page.url.host === 'significa.co'}
    <script src="/js/script.js" data-api="/api/event" data-domain="significa.co"></script>
    <script src="/js/script.actions.js" data-api="/api/event" data-domain="significa.co"></script>
    <script>
      window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
    </script>
  {/if}
</svelte:head>

<Toaster component={ToastNotification} />
<DraftMode />

<PageDrawer />
<ImageGallery />
<slot />
