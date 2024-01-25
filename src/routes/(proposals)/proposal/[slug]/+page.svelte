<script lang="ts">
  import PasswordPage from '$components/proposals/password-page.svelte';
  import ProposalPage from '$components/proposals//proposal-page.svelte';
  import ProposalAwards from '$components/proposals/proposal-awards.svelte';
  import ProposalClients from '$components/proposals/proposal-clients.svelte';
  import ProposalTestimonials from '$components/proposals/proposal-testimonials.svelte';
  import ProposalProjects from '$components/proposals/proposal-projects.svelte';
  import Seo from '$components/seo.svelte';

  export let data;

  const proposal = data?.story?.content;
  const awards = data?.awards ?? [];
  const projects = data?.home?.story.content.page[0].projects ?? [];
  const testimonials = data?.services?.story?.content?.page[0].testimonials ?? [];
  const clients = data?.services?.story?.content?.page[0].clients ?? [];
</script>

<Seo title={proposal?.title || 'Proposal'} />

{#if data?.story && proposal}
  <ProposalPage {proposal} />
  <ProposalAwards {awards} />
  <ProposalProjects {projects} />
  <ProposalTestimonials {testimonials} />
  <ProposalClients {clients} />
{:else}
  <PasswordPage error={data.error} />
{/if}
