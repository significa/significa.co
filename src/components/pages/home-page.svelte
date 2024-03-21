<script lang="ts">
  import type { PageStoryblok } from '$types/bloks';
  import Seo from '$components/seo.svelte';

  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  export let blocks: PageStoryblok['blocks'];
</script>

<Seo />

{#if blocks}
  {#each blocks as block}
    <DynamicBlock {block} />
  {/each}
{/if}
