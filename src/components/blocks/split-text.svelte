<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { SplitTextStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  export let block: SplitTextStoryblok;
</script>

<section use:storyblokEditable={block} class={clsx(block.has_border_top && 'border-t')}>
  <div
    class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12"
  >
    <div class="lg:max-w-xl">
      <h2 class="text-5xl text-foreground-secondary">{block.eyebrow}</h2>
      <p class="text-5xl">{block.title}</p>
    </div>

    <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
      {block.description}
    </p>
  </div>
</section>
