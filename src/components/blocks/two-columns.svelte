<script lang="ts">
  import ExpandableImage from '$components/expandable-image.svelte';
  import { open } from '$components/image-gallery.svelte';
  import RichText from '$components/rich-text.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { TwoColumnsStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: TwoColumnsStoryblok;

  block.columns.map((c) => {
    if (c.component === 'column-media') {
      c.media;
    }

    if (c.component === 'column-text') {
      c.content;
    }
  });
</script>

<div class="two-columns" use:storyblokEditable={block}>
  {#each block.columns as column}
    {#if column.component === 'column-media'}
      <ExpandableImage
        class={clsx({ sticky: column.sticky })}
        image={column.media}
        enabled={!!column.expandable}
        on:expand={(e) => open([e.detail])}
      />
    {:else if column.component === 'column-text'}
      <RichText doc={column.content} />
    {/if}
  {/each}
</div>

<style lang="postcss">
  .two-columns {
    --two-columns-gap: 40px;
    --two-columns-margin-block: 40px;
    --two-columns-sticky-top: 16px;

    position: relative;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: var(--two-columns-gap);
    margin-block: var(--two-columns-margin-block);

    align-items: start;

    @media (--md) {
      --two-columns-margin-block: 60px;
    }

    @media (--lg) {
      --two-columns-margin-block: 80px;
    }

    & :global(.sticky) {
      @media (--md) {
        position: sticky;
        top: var(--two-columns-sticky-top);
      }
    }
  }
</style>
