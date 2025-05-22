<script lang="ts">
  import ExpandableImage from '$components/expandable-image.svelte';
  import { open } from '$components/image-gallery.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ImageStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { richTextBlockWidths } from '$lib/constants';

  export let block: ImageStoryblok;
</script>

{#if block?.image?.filename}
  <figure
    class={clsx(
      'not-rich-text mx-auto my-8 h-auto w-full md:my-14',
      block?.image_dark?.filename && 'dark:hidden',
      $$restProps.class,
      richTextBlockWidths[block?.width || 'full']
    )}
    use:storyblokEditable={block}
  >
    <ExpandableImage
      image={block.image}
      enabled={!!block.expandable}
      on:expand={(e) =>
        open([{ ...e.detail, alt: e.detail.alt || '', title: e.detail.title || '' }])}
    />
    {#if block?.image?.title}
      <figcaption class="mt-2 text-center text-sm text-foreground-secondary">
        {block.image.title}
      </figcaption>
    {/if}
  </figure>
{/if}

{#if block?.image_dark?.filename}
  <figure
    class={clsx(
      'not-rich-text mx-auto my-8 hidden h-auto w-full dark:block md:my-14',
      $$restProps.class,
      richTextBlockWidths[block?.width || 'full']
    )}
    use:storyblokEditable={block}
  >
    <ExpandableImage
      image={block.image_dark}
      enabled={!!block.expandable}
      on:expand={(e) =>
        open([{ ...e.detail, alt: e.detail.alt || '', title: e.detail.title || '' }])}
    />
    {#if block?.image?.title}
      <figcaption class="mt-2 text-center text-sm text-foreground-secondary">
        {block.image_dark.title}
      </figcaption>
    {/if}
  </figure>
{/if}
