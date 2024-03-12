<script lang="ts">
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';
  import PhysicsSection from '$components/physics-section.svelte';

  import Seo from '$components/seo.svelte';
  import type { AboutPageStoryblok, PageStoryblok } from '$types/bloks';

  export let data: AboutPageStoryblok;
  export let blocks: PageStoryblok['blocks'];
</script>

<Seo />
<main>
  <div class="container relative isolate mx-auto">
    <div class="absolute top-0 z-10 px-container pt-10 md:pt-14 lg:pt-20">
      <h1 class="max-w-2xl text-7xl">{data.page_title}</h1>
    </div>
    <PhysicsSection
      style="height: min(calc(90vh - var(--topnav-height)), 830px);"
      items={data.physics_blocks}
    />
  </div>

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
