<script lang="ts">
  import PasswordPage from './password-page.svelte';
  import ProposalPage from './proposal-page.svelte';
  import ProposalAwards from './proposal-awards.svelte';
  import ProposalClients from './proposal-clients.svelte';
  import ProposalTestimonials from './proposal-testimonials.svelte';
  import ProposalProjects from './proposal-projects.svelte';

  export let data;

  const proposal = data?.story?.content;
  const awards = data?.services?.story?.content?.page[0].awards ?? [];
  const projects = data?.home?.story.content.page[0].projects ?? [];
  const testimonials = data?.services?.story?.content?.page[0].testimonials ?? [];
  const clients = data?.services?.story?.content?.page[0].clients ?? [];
</script>

{#if data?.story && proposal}
  <ProposalPage {proposal} />
  <ProposalAwards {awards} />
  <ProposalProjects {projects} />
  <ProposalTestimonials {testimonials} />
  <ProposalClients {clients} />
{:else}
  <PasswordPage error={data.error} />
{/if}
