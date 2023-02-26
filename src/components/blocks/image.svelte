<script lang="ts">
  import ExpandableImage from '$components/expandable-image.svelte';
  import { open } from '$components/image-gallery.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ImageStoryblok } from '$types/bloks';

  export let block: ImageStoryblok;
</script>

{#if block?.image?.filename}
  <figure use:storyblokEditable={block}>
    <ExpandableImage
      image={getImageAttributes(block.image)}
      enabled={!!block.expandable}
      on:expand={(e) => open([e.detail])}
    />
    {#if block?.image?.title}
      <figcaption>{block.image.title}</figcaption>
    {/if}
  </figure>
{/if}

<style lang="postcss">
  figure {
    width: 100%;
    height: auto;
  }

  figcaption {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    color: var(--color-foreground-secondary);

    margin-top: 8px;
  }
</style>
