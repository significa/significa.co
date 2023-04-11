<script lang="ts">
  import type { AboutPageStoryblok } from '$types/bloks';

  export let data: AboutPageStoryblok;
</script>

<main>
  <div class="container mx-auto px-container">
    <h1 class="mt-10 max-w-2xl text-8xl md:mt-14 lg:mt-20">{data.page_title}</h1>
  </div>
</main>
