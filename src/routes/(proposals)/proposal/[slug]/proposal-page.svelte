<script lang="ts">
  import type { ProposalStoryblok } from '$types/bloks';
  import { slugify } from '$lib/utils/paths';
  import Hero from './hero.svelte';
  import ProposalNavigation from './proposal-navigation.svelte';

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
  {#each sections as nav}
    <h2 id={slugify(nav)} class="h-screen pt-20 pl-8 text-base font-medium">{nav}</h2>
  {/each}
</div>
