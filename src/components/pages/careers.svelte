<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { CareersPageStoryblok } from '$types/bloks';

  export let page: CareersPageStoryblok;
</script>

<Seo />
<main>
  <section class="container mx-auto px-container py-20">
    <h1 class="text-8xl">
      {page.page_title}
    </h1>
  </section>
</main>
