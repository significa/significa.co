<script lang="ts">
  import { page } from '$app/stores';
  import { slugify } from '$lib/utils/paths';
  import PasswordForm from './password-form.svelte';
  import ProposalNavigation from './proposal-navigation.svelte';

  export let data;

  $: versions = data?.story?.content.versions || [];
  $: paramVersion = $page.url.searchParams.get('version');
  $: selectedVersion = versions?.find((v) => v.version_name === paramVersion) || versions?.[0];
  $: sections = (selectedVersion?.body?.map((section) => section.title).filter(Boolean) ||
    []) as string[];
</script>

<ProposalNavigation
  {sections}
  versions={versions.map((version) => version.version_name)}
  selectedVersion={selectedVersion?.version_name}
  on:select={(event) => {
    selectedVersion = versions?.find((v) => v.version_name === event.detail) || versions[0];
  }}
/>

{#if data?.story}
  {#each sections as nav}
    <h2 id={slugify(nav)} class="h-screen pt-20 pl-8 text-base font-medium">{nav}</h2>
  {/each}
{:else}
  <PasswordForm error={data.error} />
{/if}
