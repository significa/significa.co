<script lang="ts">
  import PhysicsSection from '$components/physics-section.svelte';
  import Testimonials from '$components/testimonials.svelte';
  import Seo from '$components/seo.svelte';
  import { theme } from '$lib/stores/theme';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AboutPageStoryblok } from '$types/bloks';
  import OfficeSection from './about/office-section.svelte';
  import Timeline from './about/timeline.svelte';
  import ValueIllustrations from './about/value-illustrations.svelte';

  export let data: AboutPageStoryblok;
</script>

<Seo />
<main>
  <div class="container relative isolate mx-auto pb-20">
    <div class="absolute top-0 z-10 px-container pt-10 md:pt-14 lg:pt-20">
      <h1 class="max-w-2xl text-7xl">{data.page_title}</h1>
    </div>
    <PhysicsSection style="height: min(calc(100vh - 76px), 830px);" items={data.physics_blocks} />
  </div>

  <!-- Who we are -->
  <section class="border-t">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:py-12 xl:flex-row xl:gap-4"
    >
      <div class="xl:max-w-xl">
        <h3 class="text-5xl text-foreground-secondary">{data.about_title1}</h3>
        <p class="text-5xl">{data.about_title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary xl:max-w-xl">
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
          <h3 class="text-5xl text-foreground-secondary">{data.values_title1}</h3>
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
                <h4 class="text-2xl font-semibold">{value.title}</h4>
                <p class="text-2xl text-foreground-secondary">{value.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <Testimonials
    firstTitle={data.testimonials_title1}
    secondTitle={data.testimonials_title2}
    ctaLabel={data.testimonials_cta_label}
    ctaLink={data.testimonials_cta_link}
    testimonials={data.testimonials}
  />

  <!-- Clients -->
  <section class=" container mx-auto px-container pb-16 pt-20 lg:pb-36 lg:pt-40">
    <h3 class="text-center text-2xl text-foreground-secondary">{data.clients_title}</h3>

    {#if data.clients}
      <div class="flex flex-wrap justify-center gap-12 p-6">
        {#each data.clients as client}
          {#if client.light_mode?.filename && $theme === 'light'}
            {@const { src, alt } = getImageAttributes(client.light_mode)}
            <img {src} {alt} class="max-h-9 object-contain" />
          {/if}

          {#if client.dark_mode?.filename && $theme === 'dark'}
            {@const { src, alt } = getImageAttributes(client.dark_mode)}
            <img {src} {alt} class="max-h-9 object-contain" />
          {/if}
        {/each}
      </div>
    {/if}
  </section>

  <OfficeSection
    cards={data.office_cards}
    firstTitle={data.office_title1}
    secondTitle={data.office_title2}
    description={data.office_description}
  />
</main>
