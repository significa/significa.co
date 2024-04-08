<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { ListStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let block: ListStoryblok;
</script>

<section
  use:storyblokEditable={block}
  class={clsx(
    block.border_bottom && 'border-b',
    block.type === 'regular' ? 'lg:mt-20' : 'pb-4 lg:mt-28',
    'mt-10 md:mt-14'
  )}
>
  <div
    class={clsx(
      block.type === 'regular' ? 'gap-10 justify-between' : 'gap-6',
      'container mx-auto mb-6 flex flex-col px-container pt-8 lg:mb-12 lg:pt-12 xl:flex-row xl:gap-4'
    )}
  >
    <div
      class={clsx(
        block.type === 'regular' ? '' : 'mb-8 mr-52',
        'xl:sticky xl:top-8 xl:max-w-xl xl:self-start xl:pr-6'
      )}
    >
      <h3 class="text-5xl text-foreground-secondary">{block.title}</h3>
      <p class="text-5xl">{block.subtitle}</p>
      {#if block.description}
        <p class="text-2xl text-foreground-secondary mt-6">{block.description}</p>
      {/if}
    </div>

    {#if block.blocks}
      <div
        class={clsx(
          block.type === 'regular' ? 'gap-12' : 'gap-x-40 gap-y-16',
          'grid grid-cols-1 md:grid-cols-2'
        )}
      >
        {#each block.blocks as item}
          <div class="flex flex-col items-start xl:max-w-xs">
            {#if item.icon?.filename}
              {@const { src, alt } = getImageAttributes(item.icon)}
              <img
                {src}
                {alt}
                class={clsx(
                  block.type === 'regular' ? 'max-h-14' : 'max-h-12',
                  'mb-3 object-contain drop-shadow-md'
                )}
              />
            {/if}
            <div
              class={clsx(block.type === 'regular' ? 'text-lg' : 'mt-4 text-2xl', 'font-semibold')}
            >
              {item.benefit || item.deliverable || item.title}
            </div>
            <div
              class={clsx(
                block.type === 'regular' ? 'text-lg' : 'text-2xl',
                'font-semibold text-foreground-secondary'
              )}
            >
              {item.description}
            </div>
            {#if item.link_title && item.link}
              {@const { href } = getAnchorFromCmsLink(item.link)}
              <div class="pt-4">
                <Button variant="secondary" as="a" {href}>{item.link_title}</Button>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
