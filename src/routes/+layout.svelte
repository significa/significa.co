<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import { toast, Toaster, ToastNotification } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  import {
    PUBLIC_POSTHOG_PROJECT_TOKEN,
    PUBLIC_POSTHOG_POSTHOG_API_HOST
  } from '$env/static/public';

  import posthog from 'posthog-js';

  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  if (browser) {
    posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: PUBLIC_POSTHOG_POSTHOG_API_HOST || 'https://eu.posthog.com',
      persistence: 'localStorage',
      person_profiles: 'always'
    });
  }

  beforeNavigate(() => {
    toast.clearAll();
  });

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <Toaster component={ToastNotification} />
  <DraftMode />

  <PageDrawer />
  <ImageGallery />
  <slot />
</QueryClientProvider>
