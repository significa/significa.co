<script lang="ts">
  interface Error {
    message: string;
  }

  export let statusCode: number;
  export let error: Error | null;
</script>

<div class="grid h-[calc(100dvh-var(--topnav-height))] place-items-center">
  <p class="text-center text-lg">
    {#if statusCode >= 500}
      {statusCode} - Something went wrong.<br />We apologize for the inconvenience. If the error
      persists, please contact us.
    {:else}
      {statusCode} {error?.message}
    {/if}
  </p>
</div>
