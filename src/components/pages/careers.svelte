<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { CareersPageStoryblok } from '$types/bloks';

  export let page: CareersPageStoryblok;

  console.log(page);
</script>

<Seo />
<main>
  <section class="container mx-auto px-container py-20">
    <h1 class="text-8xl">
      {page.page_title}
    </h1>
  </section>

  <!-- What define us -->
  <section class="mt-10 border-t md:mt-14 lg:mt-20">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:py-12 xl:flex-row xl:gap-4"
    >
      <div class="xl:max-w-xl">
        <h3 class="text-5xl text-foreground-secondary">{page.careers_title1}</h3>
        <p class="text-5xl">{page.careers_title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary xl:max-w-xl">
        {page.careers_description}
      </p>
    </div>
  </section>
</main>
