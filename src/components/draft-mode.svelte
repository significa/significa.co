<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';

  const isDraft = $page.data.version === 'draft';
</script>

{#if isDraft}
  <div>
    <h4>Warning</h4>
    <p>You're viewing a <em>draft</em> version</p>
    <a
      data-sveltekit-preload-data="off"
      href="/exit-preview?return_to={encodeURIComponent($page.url.pathname)}"
    >
      See published version
    </a>
  </div>
{/if}

<!-- TODO: style -->
<style>
  div {
    position: fixed;
    z-index: 999999999;
    bottom: 16px;
    left: 16px;

    background-color: black;
    color: white;

    padding: 16px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  h4 {
    margin-bottom: 6px;
  }

  p {
    margin-bottom: 16px;
  }
</style>
