<script>
  import { page } from '$app/stores';
  import GenericError from '$components/pages/errors/generic-error.svelte';
  import NotFound from '$components/pages/errors/not-found.svelte';
</script>

{#if $page.status === 404}
  <NotFound class="mt-[--topnav-height]" />
{:else}
  <GenericError statusCode={$page.status} error={$page.error} />
{/if}
