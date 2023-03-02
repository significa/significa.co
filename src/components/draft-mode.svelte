<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import { Button, Icon } from '@significa/svelte-ui';

  let dismissed = false;
  const isDraft = $page.data.version === 'draft';
</script>

{#if isDraft && !dev && !dismissed}
  <div
    class="fixed z-50 bottom-4 left-4 bg-background-panel text-foreground p-4 rounded-xl border border-border flex flex-col items-stretch"
  >
    <header class="flex justify-between items-center mb-1.5">
      <h4 class="text-base font-medium">Warning</h4>
      <button on:click={() => (dismissed = true)}>
        <Icon icon="close" />
      </button>
    </header>
    <p class="text-base mb-4">You're viewing a <em>draft</em> version</p>
    <Button
      as="a"
      variant="secondary"
      data-sveltekit-preload-data="off"
      href="/exit-preview?return_to={encodeURIComponent($page.url.pathname)}"
    >
      Published version
    </Button>
  </div>
{/if}
