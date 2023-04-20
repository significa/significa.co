<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { CareersPageStoryblok } from '$types/bloks';
  import Canvas from './careers/canvas.svelte';

  export let page: CareersPageStoryblok;
</script>

<Seo />
<main>
  <Canvas
    title={page.page_title}
    height={page.canvas_height}
    width={page.canvas_width}
    items={page.canvas_items}
  />
</main>
