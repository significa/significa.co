<script lang="ts">
  import type { ProposalStoryblok } from '$types/bloks';
  import { slugify } from '$lib/utils/paths';
  import Hero from './hero.svelte';
  import ProposalNavigation from './proposal-navigation.svelte';
  import RichText from '$components/rich-text.svelte';

  export let proposal: ProposalStoryblok;
  const versions = proposal?.versions || [];
  let version = versions.length > 0 ? versions[0].version_name : '';

  $: content = versions.find((v) => v.version_name === version);
  $: sections = (content?.body || []).map((b) => b.title || '').filter(Boolean);
</script>

<ProposalNavigation
  {sections}
  versions={versions.map((version) => version.version_name)}
  bind:version
/>
<div class="container mx-auto px-container">
  <Hero {proposal} date={content?.date}></Hero>
  {#each content?.body || [] as section}
    <section id={slugify(section.title)} class="pt-20 lg:pt-28">
      <div class="flex flex-col gap-12 lg:flex-row">
        <h2 class="text-4xl lg:w-1/2">{section.title}</h2>

        <div class="w-full">
          <RichText class="lg:w-2/3" doc={section.body} />
        </div>
      </div>

      {#if section.data === 'scope' && content?.scope}
        <!-- TODO: <ProposalScope data={content.scope} /> -->
      {:else if section.data === 'team' && content?.estimates}
        <!-- TODO: <ProposalTeam data={content.scope} /> -->
      {:else if section.data === 'estimates' && content?.estimates}
        <!-- TODO: <ProposalEstimates data={content.scope} /> -->
      {:else if section.data === 'timeline' && content?.estimates}
        <!-- TODO: <ProposalTimeline data={content.scope} /> -->
      {/if}
    </section>
  {/each}
</div>
