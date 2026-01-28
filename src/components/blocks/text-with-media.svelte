<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';
  import type { TextWithMediaStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let block: TextWithMediaStoryblok;

  $: hasMedia = block?.media?.filename;
  $: isVideo =
    block?.media?.filename &&
    hasMedia &&
    VIDEO_EXTENSIONS.includes(getFileExtension(block?.media?.filename));
</script>

<section
  use:storyblokEditable={block}
  class={clsx(
    'min-h-[500px] lg:container lg:mx-auto lg:px-container',
    'flex flex-col-reverse lg:flex-row',
    isVideo && 'h-full',
    hasMedia && block?.revert_orientation && 'lg:flex-row-reverse'
  )}
>
  {#if hasMedia}
    <div
      class={clsx(
        'hidden w-1/2 justify-center py-12 lg:flex lg:py-12',
        hasMedia &&
          (block?.revert_orientation
            ? 'lg:border-l lg:border-r-0 lg:pl-12'
            : 'lg:border-r lg:pr-12')
      )}
    >
      {#if isVideo}
        <video
          class="pointer-events-none aspect-auto h-auto w-auto rounded-md bg-background-offset"
          muted
          playsinline
          autoplay
          loop
          src={block?.media?.filename}
        />
      {:else if block.media?.filename}
        {@const { src, alt, width, height } = getImageAttributes(block.media, {
          size: [1440 * 2, 0]
        })}
        <img class="h-auto w-full rounded-md bg-background-offset" {src} {alt} {width} {height} />
      {/if}
    </div>
  {/if}

  <div
    class={clsx(
      'flex items-center border-b px-container py-14 lg:w-1/2 lg:border-none',
      !hasMedia && 'lg:pl-0'
    )}
  >
    <div>
      <h3 class="mb-6 text-5xl lg:max-w-2xl">
        <span class="text-foreground-secondary">{block.eyebrow}</span> <br />
        {block.title}
      </h3>
      <p class="mb-8 text-2xl text-foreground-secondary">{block.description}</p>
      {#if block.cta && block.cta?.[0]}
        {@const { href } = getAnchorFromCmsLink(block.cta[0]?.link)}
        <Button as="a" arrow variant="secondary" {href}>{block.cta[0].label}</Button>
      {/if}
    </div>
  </div>
</section>
