<script lang="ts">
  import ExpandableImage from '$components/expandable-image.svelte';
  import { open } from '$components/image-gallery.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ImageStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: ImageStoryblok;
</script>

{#if block?.image?.filename}
  <figure
    class={clsx('not-rich-text my-8 h-auto w-full md:my-14', $$restProps.class)}
    use:storyblokEditable={block}
  >
    <ExpandableImage
      image={block.image}
      enabled={!!block.expandable}
      on:expand={(e) => open([e.detail])}
    />
    {#if block?.image?.title}
      <figcaption class="mt-2 text-center text-sm text-foreground-secondary">
        {block.image.title}
      </figcaption>
    {/if}
  </figure>
{/if}
