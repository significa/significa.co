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

<div
  use:storyblokEditable={block}
  class={clsx(
    'not-rich-text my-10 gap-x-4 lg:my-20',
    block.density === 'tight' && 'sm:columns-2 md:columns-3 md:gap-x-6 lg:columns-4',
    block.density === 'regular' && 'sm:columns-2 lg:columns-3 lg:gap-x-6',
    block.density === 'loose' && 'sm:columns-2 sm:gap-x-6 lg:gap-x-10',
    $$restProps.class
  )}
>
  {#each block.images as image, i}
    <ExpandableImage
      class={clsx(
        'mb-4',
        block.density === 'tight' && 'md:mb-6',
        block.density === 'regular' && 'lg:mb-6',
        block.density === 'loose' && 'sm:mb-6 lg:mb-10'
      )}
      {image}
      enabled={!!block.expandable}
      on:expand={() => handleExpand(i)}
    />
  {/each}
</div>
