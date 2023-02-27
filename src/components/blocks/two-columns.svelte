<script lang="ts">
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
    <RichText
      class={clsx('two-column-rich-text', { sticky: column.sticky })}
      doc={column.content}
    />
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
