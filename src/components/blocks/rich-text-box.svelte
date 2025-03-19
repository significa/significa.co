<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { RichtextBoxStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { Icon } from '@significa/svelte-ui';
  import Video from './video.svelte';

  export let block: RichtextBoxStoryblok;
  $: ({ href } = getAnchorFromCmsLink(block.link?.[0]?.link) || { href: undefined });
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  use:storyblokEditable={block}
  use:drawerLinks
  {...href ? { href } : {}}
  class={clsx(
    'not-rich-text my-6 rounded-2xl bg-background-panel p-4 md:my-10',
    href && 'transition-all hover:border-border-active hover:ring-2',
    block.layout === 'horizontal' && 'flex flex-col items-stretch gap-4 xs:flex-row',
    $$restProps.class
  )}
>
  {#if block.image?.filename}
    {@const { src, alt, width, height } = getImageAttributes(block.image)}
    <div
      class={clsx(
        'flex flex-shrink-0',
        block.layout === 'horizontal' && 'w-full xs:w-1/3',
        block.layout === 'vertical' && 'mb-4'
      )}
    >
      <img
        class={clsx('aspect-auto rounded-md object-cover', block.layout === 'vertical' && 'w-full')}
        {src}
        {alt}
        {width}
        {height}
      />
    </div>
  {:else if block.video && block.video.length > 0}
    <Video
      block={block.video[0]}
      class={clsx(
        ' flex flex-shrink-0 ',
        block.layout === 'horizontal' && '!my-0 w-full xs:w-1/3',
        block.layout === 'vertical' && '!mb-4 !mt-0'
      )}
    />
  {/if}
  <div class="flex flex-col">
    <div class="flex-1">
      <h4 class="text-xl font-semibold">{block.title}</h4>
      <p class="mt-0.5 text-xl">{block.text}</p>
    </div>
    {#if block.link?.length}
      {#each block.link as { label }}
        <div class="mt-4 inline-flex items-center gap-2 text-base font-medium">
          {label}
          <Icon icon="arrow-right" />
        </div>
      {/each}
    {/if}
  </div>
</svelte:element>
