<script lang="ts">
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';
  import PhysicsSection from '$components/physics-section.svelte';

  import Seo from '$components/seo.svelte';
  import type { AboutPageStoryblok, PageStoryblok } from '$types/bloks';
  import Timeline from './about/timeline.svelte';
  import ValueIllustrations from './about/value-illustrations.svelte';

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
  <!-- Our Values -->
  <section class="border-t">
    <div
      class="container mx-auto flex flex-col gap-8 px-container pt-8 lg:flex-row lg:justify-between lg:pt-0"
    >
      <div class="flex flex-col justify-between gap-6 lg:max-w-xl lg:py-12">
        <div>
          <h2 class="text-5xl text-foreground-secondary">{data.values_title1}</h2>
          <p class="text-5xl">{data.values_title2}</p>
        </div>

        <p class="text-2xl text-foreground-secondary lg:max-w-md">{data.values_description}</p>
      </div>

      {#if data.values}
        <div class="lg:max-w-xl">
          {#each data.values as value}
            <div
              class="flex flex-col items-start gap-4 border-t py-8 first:border-none lg:flex-row lg:items-center lg:gap-8 lg:py-12"
            >
              <ValueIllustrations
                variant={value.illustration}
                class="block shrink-0 drop-shadow-md"
              />
              <div>
                <h3 class="text-2xl font-semibold">{value.title}</h3>
                <p class="text-2xl text-foreground-secondary">{value.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
