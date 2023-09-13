<script lang="ts">
  import { page } from '$app/stores';
  import { slugify } from '$lib/utils/paths';
  import PasswordForm from './password-form.svelte';
  import ProposalNavigation from './proposal-navigation.svelte';

  export let data;

  $: versions = data.story?.content.versions || [];
  $: version = $page.url.searchParams.get('version');
  $: selectedVersion = versions.find((v) => v.version_name === version) || versions[0];

  $: sections = (selectedVersion.body?.map((section) => section.title).filter(Boolean) ||
    []) as string[];
</script>

<ProposalNavigation {sections} />

{#if data.story}
  {#each sections as nav}
    <h2 id={slugify(nav)} class="h-screen pt-20">{nav}</h2>
  {/each}
{:else}
  <PasswordForm error={data.error} />
{/if}
