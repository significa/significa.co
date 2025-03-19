<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { TimelineStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import Timeline from '../pages/about/timeline.svelte';

  export let block: TimelineStoryblok;
</script>

<section use:storyblokEditable={block} class={clsx(block.has_border_top && 'border-t')}>
  {#if block.title1 || block.title2 || block.description}
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12"
    >
      <div class="lg:max-w-xl">
        <h2 class="text-5xl text-foreground-secondary">{block.title1}</h2>
        <p class="text-5xl">{block.title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
        {block.description}
      </p>
    </div>
  {/if}
</section>

<Timeline timeline={block.timeline} />
