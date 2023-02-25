<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ImageStoryblok } from '$types/bloks';

  export let block: ImageStoryblok;
</script>

{#if block?.image?.filename}
  {@const { src, alt, width, height, title } = getImageAttributes(block.image)}
  <figure use:storyblokEditable={block}>
    <img {src} {alt} {width} {height} />
    {#if title}
      <figcaption>{title}</figcaption>
    {/if}
  </figure>
{/if}

<style lang="postcss">
  figure,
  img {
    width: 100%;
    height: auto;
  }

  img {
    border-radius: var(--border-radius-md);
  }

  figcaption {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    color: var(--color-foreground-secondary);

    margin-top: 8px;
  }
</style>
