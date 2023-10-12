<script lang="ts">
  import type { HomePageStoryblok, ProposalStoryblok, ServicesPageStoryblok } from '$types/bloks';
  import { slugify } from '$lib/utils/paths';
  import Hero from './hero.svelte';
  import ProposalNavigation from './proposal-navigation.svelte';
  import RichText from '$components/rich-text.svelte';
  import ProposalScope from './proposal-scope.svelte';
  import ProposalTeam from './proposal-team.svelte';
  import ProposalEstimates from './proposal-estimates.svelte';
  import ProposalAwards from './proposal-awards.svelte';
  import ProposalClients from './proposal-clients.svelte';
  import ProposalTestimonials from './proposal-testimonials.svelte';
  import ProposalProjects from './proposal-projects.svelte';
  import ProposalReplyBlock from './proposal-reply-block.svelte';

  export let proposal: ProposalStoryblok;
  export let services: ServicesPageStoryblok;
  export let home: HomePageStoryblok;

  const versions = proposal?.versions || [];
  let version = versions.length > 0 ? versions[0].version_name : '';

  $: content = versions.find((v) => v.version_name === version);
  $: sections = (content?.body || []).map((b) => b.title || '').filter(Boolean);

  let sectionTitleWidth;
  let containerWidth: number;
  let windowWidth: number;

  $: containerMargin = (windowWidth - containerWidth) / 2;
</script>

<div class="container mx-auto" bind:clientWidth={containerWidth}></div>
<div class="w-full" bind:clientWidth={windowWidth}></div>

<ProposalNavigation
  {sections}
  versions={versions.map((version) => version.version_name)}
  bind:version
/>

<Hero {proposal} date={content?.date}></Hero>
{#each content?.body || [] as section}
  <section id={slugify(section.title)} class=" pt-20 lg:pt-28">
    <div class="container mx-auto px-container flex flex-col gap-12 lg:flex-row">
      <h2 bind:clientWidth={sectionTitleWidth} class="text-4xl lg:w-1/2">{section.title}.</h2>
      <div class="w-full">
        <RichText class="lg:w-2/3" doc={section.body} />
      </div>
    </div>
    <div class="pt-20">
      {#if section.data === 'scope' && content?.scope}
        <ProposalScope data={content.scope} {windowWidth} {containerMargin} {sectionTitleWidth} />
      {:else if section.data === 'team' && content?.team}
        <ProposalTeam data={content.team} {windowWidth} {containerMargin} {sectionTitleWidth} />
      {:else if section.data === 'estimates' && content?.estimates}
        <ProposalEstimates
          data={content.estimates}
          team={content.team}
          discount={content.discount_percentage}
          {windowWidth}
          {containerMargin}
          {sectionTitleWidth}
        />
        <!-- FIXME: Implement timeline -->
        <!-- {:else if section.data === 'timeline'} -->
      {/if}
    </div>
  </section>
{/each}

<ProposalReplyBlock></ProposalReplyBlock>

<!-- Awards -->
{#if services.awards?.length}
  <ProposalAwards awards={services.awards}></ProposalAwards>
{/if}

<!-- Projects -->
{#if home.projects?.length}
  <ProposalProjects projects={home.projects}></ProposalProjects>
{/if}

<!-- Testimonials -->
{#if services.testimonials?.length}
  <ProposalTestimonials testimonials={services.testimonials}></ProposalTestimonials>
{/if}

<!-- Clients -->
{#if services.clients?.length}
  <ProposalClients clients={services.clients}></ProposalClients>
{/if}
