<script lang="ts">
  import PasswordPage from './password-page.svelte';
  import ProposalPage from './proposal-page.svelte';

  export let data;

  const proposal = data?.story?.content;
</script>

{#if data?.story && proposal}
  <ProposalPage {proposal} />
{:else}
  <PasswordPage error={data.error} />
{/if}
