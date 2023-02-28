<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import { Button, Icon } from '@significa/svelte-ui';

  let dismissed = false;
  const isDraft = $page.data.version === 'draft';
</script>

{#if isDraft && !dev && !dismissed}
  <div>
    <header>
      <h4>Warning</h4>
      <button on:click={() => (dismissed = true)}>
        <Icon icon="close" />
      </button>
    </header>
    <p>You're viewing a <em>draft</em> version</p>
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

<style>
  div {
    position: fixed;
    z-index: calc(var(--z-index-max) + 1);
    bottom: 16px;
    left: 16px;

    background-color: var(--color-background-panel);
    color: var(--color-foreground);

    padding: 16px;
    border-radius: var(--border-radius-xl);
    border: 1px solid var(--color-border);

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  h4 {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }

  p {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    margin-bottom: 16px;
  }

  button {
    all: unset;

    cursor: pointer;
    padding: 4px;
  }
</style>
