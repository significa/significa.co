<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { TwoColumnsStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: TwoColumnsStoryblok;
</script>

<div
  class="relative my-10 lg:my-20 grid lg:grid-cols-2 gap-10 items-start"
  use:storyblokEditable={block}
>
  {#each block.columns as column}
    <RichText class={clsx('rich-text', column.sticky && 'lg:sticky top-4')} doc={column.content} />
  {/each}
</div>
