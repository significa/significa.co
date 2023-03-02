<script lang="ts">
  import ExpandableImage from '$components/expandable-image.svelte';
  import { open } from '$components/image-gallery.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ImageStoryblok } from '$types/bloks';

  export let block: ImageStoryblok;
</script>

{#if block?.image?.filename}
  <figure class="not-rich-text my-6 md:my-10 w-full h-auto" use:storyblokEditable={block}>
    <ExpandableImage
      image={block.image}
      enabled={!!block.expandable}
      on:expand={(e) => open([e.detail])}
    />
    {#if block?.image?.title}
      <figcaption class="text-sm text-foreground-secondary mt-2 text-center">
        {block.image.title}
      </figcaption>
    {/if}
  </figure>
{/if}
