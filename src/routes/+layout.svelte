<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';

  import DraftMode from '$components/draft-mode.svelte';
  import ImageGallery from '$components/image-gallery.svelte';
  import TopNavigation from '$components/top-navigation.svelte';
  import PageDrawer from '$components/page-drawer.svelte';
  import Footer from '$components/footer.svelte';
  import { toast, Toaster, ToastNotification } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';
  export let data;

  beforeNavigate(() => {
    toast.clearAll();
  });
</script>

<Toaster component={ToastNotification} />
<PageDrawer />
<DraftMode />
<ImageGallery />
<TopNavigation
  configuration={data.configuration.content}
  variant={$page.url.pathname.startsWith('/handbook') ? 'handbook' : 'default'}
/>
<slot />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}
