<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import { Button, Icon } from '@significa/svelte-ui';

  let dismissed = false;
  const isDraft = $page.data.version === 'draft';
</script>

{#if isDraft && !dev && !dismissed}
  <div
    data-theme="yellow"
    class="fixed bottom-4 left-4 z-50 flex flex-col items-stretch rounded-xl border bg-background-panel p-4 text-foreground"
  >
    <header class="mb-1.5 flex items-center justify-between">
      <h4 class="text-base font-medium">Warning</h4>
      <button on:click={() => (dismissed = true)}>
        <Icon icon="close" />
      </button>
    </header>
    <p class="mb-4 text-base">You're viewing a draft version</p>
    <Button
      as="a"
      data-sveltekit-preload-data="off"
      data-sveltekit-reload
      href="/exit-preview?return_to={encodeURIComponent($page.url.pathname)}"
    >
      Published version
    </Button>
  </div>
{/if}
