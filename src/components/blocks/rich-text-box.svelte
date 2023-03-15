<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { RichtextBoxStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let block: RichtextBoxStoryblok;
</script>

<div
  use:storyblokEditable={block}
  class={clsx(
    'not-rich-text my-6 rounded-2xl bg-background-panel p-4 md:my-10',
    block.layout === 'horizontal' && 'flex items-stretch gap-4',
    $$restProps.class
  )}
>
  {#if block.image?.filename}
    {@const { src, alt } = getImageAttributes(block.image)}
    <div
      class={clsx(
        'flex-shrink-0',
        block.layout === 'horizontal' && 'w-1/3',
        block.layout === 'vertical' && 'mb-4'
      )}
    >
      <img class="h-auto rounded-md object-cover" {src} {alt} />
    </div>
  {/if}
  <div class="flex flex-col">
    <div class="flex-1">
      <h4 class="text-xl font-semibold">{block.title}</h4>
      <p class="mt-0.5 text-xl">{block.text}</p>
    </div>
    {#if block.link?.length}
      {#each block.link as { label, link }}
        {@const { href } = getAnchorFromCmsLink(link)}
        <div class="mt-4">
          <Button as="a" {href} variant="secondary" arrow>{label}</Button>
        </div>
      {/each}
    {/if}
  </div>
</div>
