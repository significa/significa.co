<script lang="ts">
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  import Seo from '$components/seo.svelte';
  import type { PageStoryblok } from '$types/bloks';

  export let blocks: PageStoryblok['blocks'];
</script>

<Seo />
<main>
  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
