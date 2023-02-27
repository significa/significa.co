<script lang="ts">
  import ExpandableImage from '$components/expandable-image.svelte';
  import { open } from '$components/image-gallery.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ImageGridStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: ImageGridStoryblok;

  const handleExpand = (index: number) => {
    // re-create array with the selected image first (preserving order)
    open([...block.images.slice(index), ...block.images.slice(0, index)]);
  };
</script>

<div use:storyblokEditable={block} class={clsx(block.density)}>
  {#each block.images as image, i}
    <ExpandableImage {image} enabled={!!block.expandable} on:expand={() => handleExpand(i)} />
  {/each}
</div>

<style lang="postcss">
  div {
    --column-count: 1;
    --grid-margin: 16px;

    column-count: var(--column-count);
    column-gap: var(--grid-margin);

    & > :global(*) {
      margin-bottom: var(--grid-margin);
    }

    &.loose {
      @media (--sm) {
        --column-count: 2;
        --column-gap: 24px;
      }

      @media (--lg) {
        --column-gap: 40px;
      }
    }

    &.regular {
      @media (--sm) {
        --column-count: 2;
      }

      @media (--lg) {
        --column-count: 3;
        --column-gap: 24px;
      }
    }

    &.tight {
      @media (--sm) {
        --column-count: 2;
      }

      @media (--md) {
        --column-count: 3;
        --column-gap: 24px;
      }

      @media (--lg) {
        --column-count: 4;
      }
    }
  }
</style>
