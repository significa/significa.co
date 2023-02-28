<script lang="ts">
  import { clsx } from 'clsx';
  import { RichTextResolver, type ISbRichtext } from '@storyblok/js';
  import DynamicBlock from './blocks/dynamic-block.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import Slot from './slot.svelte';

  type Section = NonNullable<ISbRichtext['content']>[number];
  type Block = NonNullable<Section['attrs']['body']>[number];

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    doc: ISbRichtext;
    headingMap?: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
    getNodeAttributes?: (section: Section) => Partial<Record<string, string>>;
    getBlockAttributes?: (block: Block) => Partial<Record<string, string>>;
    wrapper?: ConstructorOfATypedSvelteComponent;
    as?: string;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let doc: $$Props['doc'];
  export let headingMap: $$Props['headingMap'] = {};
  export let getNodeAttributes: $$Props['getNodeAttributes'] = () => ({});
  export let getBlockAttributes: $$Props['getBlockAttributes'] = () => ({});
  export let as: $$Props['as'] = 'div';
  export let wrapper: $$Props['wrapper'] = Slot;

  const defaultHeadingMap: typeof headingMap = {
    1: 'h2', // h1 is reserved for the page title
    2: 'h3',
    3: 'h4',
    4: 'h5',
    5: 'h6',
    6: 'h6'
  };
  const headings = { ...defaultHeadingMap, ...headingMap };

  const resolver = new RichTextResolver();
</script>

{#if doc.type === 'doc' && doc.content?.length}
  <svelte:element this={as} class={clsx('rich-text', className)}>
    <svelte:component this={wrapper}>
      {#each doc.content as section}
        {@const nodeAttributes = getNodeAttributes?.(section) || {}}
        {#if section.type === 'paragraph'}
          <p {...nodeAttributes}>{@html resolver.render(section)}</p>
        {:else if section.type === 'heading'}
          {@const content = resolver.render(section)}
          <svelte:element this={headings[section.attrs.level.toString()]} {...nodeAttributes}>
            {@html content}
          </svelte:element>
        {:else if section.type === 'bullet_list'}
          <ul {...nodeAttributes}>{@html resolver.render(section)}</ul>
        {:else if section.type === 'ordered_list'}
          <ol {...nodeAttributes}>{@html resolver.render(section)}</ol>
        {:else if section.type === 'blockquote'}
          <blockquote {...nodeAttributes}>{@html resolver.render(section)}</blockquote>
        {:else if section.type === 'horizontal_rule'}
          <hr {...nodeAttributes} />
        {:else if section.type === 'blok'}
          {#each section.attrs.body as block}
            {@const blockAttributes = getBlockAttributes?.(block) || {}}
            <div
              {...nodeAttributes}
              {...blockAttributes}
              class={clsx(
                'block',
                `block-${block.component}`,
                nodeAttributes.class,
                blockAttributes.class
              )}
            >
              <DynamicBlock {block} />
            </div>
          {/each}
        {/if}
      {/each}
    </svelte:component>
  </svelte:element>
{/if}

<style lang="postcss">
  .rich-text {
    & :global(p),
    & :global(ul),
    & :global(ol),
    & :global(blockquote) {
      font-size: var(--font-size-xl);
      line-height: var(--line-height-xl);
    }

    & :global(b) {
      font-weight: var(--font-weight-medium);
    }

    & :global(code:not([class*='language-'])) {
      font-family: var(--font-family-mono);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-medium);
      padding: 2px 4px;
      border-radius: var(--border-radius-xs);
      border: 1px solid var(--color-border-subtle);
      background-color: var(--color-background-offset);
    }

    & :global(a) {
      color: var(--color-foreground-accent);
    }

    & :global(p):not(:last-child) {
      margin-bottom: 1.5ch;
    }

    & :global(ul),
    & :global(ol) {
      margin-block: 2ch;
      padding-left: 1.5ch;

      & :global(li) {
        margin-bottom: 0.8ch;
      }

      & :global(li ul),
      & :global(li ol) {
        margin-top: 0.8ch;
      }
    }

    & :global(ol li)::marker {
      color: var(--color-foreground-tertiary);
    }

    & :global(ul li) {
      list-style-type: none;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 9px;
        left: -1.5ch;
        width: 1ch;
        height: 1ch;
        background-color: var(--color-foreground-tertiary);
        mask-image: url('data:image/svg+xml;utf8,<svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8c1.958 0 3.5-1.495 3.5-3.394S5.958 0 4 0 .5 2.707.5 4.606 2.042 8 4 8Z" fill="currentColor"/></svg>');
        mask-repeat: no-repeat;
        mask-position: center center;
      }
    }

    & :global(blockquote) {
      background-color: var(--color-background-offset);
      padding: 24px;
      border-radius: var(--border-radius-md);

      margin-block: 32px;
    }

    & :global(h2),
    & :global(h3),
    & :global(h4) {
      font-weight: var(--font-weight-semibold);
      margin-bottom: 1ch;

      &:not(:first-child) {
        margin-top: 2ch;
      }
    }

    & :global(h2) {
      font-size: var(--font-size-3xl);
      line-height: var(--line-height-3xl);
    }

    & :global(h3) {
      font-size: var(--font-size-2xl);
      line-height: var(--line-height-2xl);
    }

    & :global(h4) {
      font-size: var(--font-size-xl);
      line-height: var(--line-height-xl);
    }

    & :global(.block) {
      margin-block: 40px;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    & :global(hr) {
      border: none;

      margin-block: 32px;
      height: 20px;
      background-color: var(--color-foreground);
      mask-image: url('data:image/svg+xml;utf8,<svg width="52" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12c1.958 0 3.5-1.495 3.5-3.394S9.958 4 8 4 4.5 6.707 4.5 8.606C4.5 10.506 6.042 12 8 12ZM26 12c1.958 0 3.5-1.495 3.5-3.394S27.958 4 26 4s-3.5 2.707-3.5 4.606c0 1.9 1.542 3.394 3.5 3.394ZM44 12c1.958 0 3.5-1.495 3.5-3.394S45.958 4 44 4s-3.5 2.707-3.5 4.606c0 1.9 1.542 3.394 3.5 3.394Z" fill="black"/></svg>');
      mask-repeat: no-repeat;
      mask-position: center center;
    }
  }
</style>
