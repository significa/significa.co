<script lang="ts">
  import VerticalListEntry from '$components/vertical-list-entry.svelte';
  import type { VerticalListStoryblok } from '$types/bloks';

  export let block: VerticalListStoryblok;
</script>

{#if block.entry}
  <section>
    {#each block.entry as entry}
      <VerticalListEntry {entry} />
    {/each}
  </section>
{/if}
