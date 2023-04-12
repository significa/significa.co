<script lang="ts">
  import type { AboutPageStoryblok } from '$types/bloks';
  import OfficeSection from './about/office-section.svelte';

  export let data: AboutPageStoryblok;
</script>

<main>
  <div class="container mx-auto px-container">
    <h1 class="mt-10 max-w-2xl text-8xl md:mt-14 lg:mt-20">{data.page_title}</h1>
  </div>
</main>

<!-- Who we are -->
<section class="mt-10 border-t md:mt-14 lg:mt-20">
  <div
    class="container mx-auto flex flex-col justify-between gap-7 px-container py-12 xl:flex-row xl:gap-4"
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

<OfficeSection
  cards={data.office_cards}
  firstTitle={data.office_title1}
  secondTitle={data.office_title2}
  description={data.office_description}
/>
