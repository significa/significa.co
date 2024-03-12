<script lang="ts">
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';
  import PhysicsSection from '$components/physics-section.svelte';

  import Seo from '$components/seo.svelte';
  import type { AboutPageStoryblok, PageStoryblok } from '$types/bloks';
  import Timeline from './about/timeline.svelte';

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

  <!-- Who we are -->
  <section class="border-t">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12"
    >
      <div class="lg:max-w-xl">
        <h2 class="text-5xl text-foreground-secondary">{data.about_title1}</h2>
        <p class="text-5xl">{data.about_title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
        {data.about_description}
      </p>
    </div>
  </section>

  <Timeline timeline={data.timeline} />

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
