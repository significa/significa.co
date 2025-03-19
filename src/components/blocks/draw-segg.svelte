<script lang="ts">
  import DrawYourSegg from '$components/draw-your-segg/draw-your-segg.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { DrawSeggStoryblok } from '$types/bloks';

  export let block: DrawSeggStoryblok;
</script>

<section use:storyblokEditable={block} class="border-t">
  <div
    class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12"
  >
    <div class="lg:max-w-xl">
      <h3 class="text-5xl text-foreground-secondary">{block.title}</h3>
      <p class="text-5xl">{block.subtitle}</p>
    </div>

    <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
      {block.description}
    </p>
  </div>

  <div
    class="container mx-auto flex items-center justify-center px-container pt-4 md:mt-6 lg:mt-10"
  >
    <DrawYourSegg />
  </div>
</section>
