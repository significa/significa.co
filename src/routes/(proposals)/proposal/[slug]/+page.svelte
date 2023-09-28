<script lang="ts">
  import PasswordPage from './password-page.svelte';
  import ProposalPage from './proposal-page.svelte';

  export let data;

  const proposal = data?.story?.content;
  const services = data?.services?.story?.content?.page[0];
  const home = data?.home?.story.content.page[0];
</script>

{#if data?.story && proposal}
  <ProposalPage {proposal} {services} {home} />
{:else}
  <PasswordPage error={data.error} />
{/if}
