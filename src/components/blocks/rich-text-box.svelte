<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { RichtextBoxStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let block: RichtextBoxStoryblok;
</script>

<div use:storyblokEditable={block} class={clsx('rich-text-box', block.layout)}>
  {#if block.image?.filename}
    {@const { src, alt } = getImageAttributes(block.image)}
    <img {src} {alt} />
  {/if}
  <div class="content">
    <div>
      <h4>{block.title}</h4>
      <p>{block.text}</p>
    </div>
    {#if block.link?.length}
      {#each block.link as link}
        {@const { href } = getAnchorFromCmsLink(link)}
        <div class="link">
          <Button as="a" {href} variant="secondary" icon="link" arrow>{link.label}</Button>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="postcss">
  .rich-text-box {
    background-color: var(--color-background-panel);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-3xl);
    overflow: hidden;

    &.horizontal {
      display: flex;

      & img {
        width: 30%;
        object-fit: cover;
      }
    }

    &.vertical {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    & .content {
      padding: 16px;
    }

    & h4 {
      font-size: var(--font-size-lg);
      margin-bottom: 4px;
    }

    & p {
      font-size: var(--font-size-md);
    }

    .link {
      margin-top: 16px;
    }
  }
</style>
