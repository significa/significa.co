<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { TwoColumnsStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: TwoColumnsStoryblok;
</script>

<div
  class={clsx(
    'relative my-10 grid items-start gap-10 @lg:my-20 @lg:grid-cols-2',
    $$restProps.class
  )}
  use:storyblokEditable={block}
>
  {#each block.columns as column}
    <RichText
      class={clsx('rich-text', column.sticky && 'top-4 @4xl:sticky')}
      doc={column.content}
    />
  {/each}
</div>
