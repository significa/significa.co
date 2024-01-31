<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import { toast, Toaster, ToastNotification } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  import { PUBLIC_POSTHOG_PROJECT_TOKEN } from '$env/static/public';
  import posthog from 'posthog-js';

  if (browser) {
    posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: 'https://eu.posthog.com',
      persistence: 'localStorage'
    });
  }

  beforeNavigate(() => {
    toast.clearAll();
  });
</script>

<Toaster component={ToastNotification} />
<DraftMode />

<PageDrawer />
<ImageGallery />
<slot />
