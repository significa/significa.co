<script lang="ts">
  import Timeline from '$components/pages/services/timeline.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { TimelineServicesStoryblok } from '$types/bloks';

  export let block: TimelineServicesStoryblok;
</script>

<section use:storyblokEditable={block} class="overflow-clip">
  <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
    <h1 class="mb-2 text-3xl max-w-6xl text-7xl text-foreground-secondary">{block.title}</h1>
    <h2 class="max-w-6xl text-7xl">{block.description}</h2>
  </div>

  <!-- Timeline -->
  {#if block.timeline}
    <Timeline timeline={block.timeline} class="mt-20" />
  {/if}
</section>
