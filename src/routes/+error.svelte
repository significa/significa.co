<script lang="ts">
  import { page } from '$app/stores';
  import GenericError from '$components/pages/errors/generic-error.svelte';
  import NotFound from '$components/pages/errors/not-found.svelte';

  if ($page.status >= 500) {
    console.error('Unhandled server error:', { $page });
  }
</script>

{#if $page.status === 404}
  <NotFound />
{:else}
  <GenericError statusCode={$page.status} error={$page.error} />
{/if}
