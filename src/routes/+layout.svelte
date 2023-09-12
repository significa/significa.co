<script lang="ts">
  import '$styles/index.css';

  import DraftMode from '$components/draft-mode.svelte';
  import { toast, Toaster, ToastNotification } from '@significa/svelte-ui';
  import { beforeNavigate } from '$app/navigation';

  beforeNavigate(() => {
    toast.clearAll();
  });
</script>

<Toaster component={ToastNotification} />
<DraftMode />
<slot />
