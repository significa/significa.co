<script lang="ts">
  import { clsx } from 'clsx';
  import { RichTextResolver, type ISbRichtext } from '@storyblok/js';
  import DynamicBlock from './blocks/dynamic-block.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Section = NonNullable<ISbRichtext['content']>[number];
  type Block = NonNullable<Section['attrs']['body']>[number];

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    doc: ISbRichtext;
    headingMap?: Record<string, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
    getAttributes?: (section: Section, block?: Block) => Partial<Record<string, string>>;
    wrapper?: ConstructorOfATypedSvelteComponent;
    as?: string;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let doc: $$Props['doc'];
  export let headingMap: $$Props['headingMap'] = {};
  export let getAttributes: $$Props['getAttributes'] = () => ({});
  export let as: $$Props['as'] = 'div';

  const defaultHeadingMap: typeof headingMap = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6'
  };
  const headings = { ...defaultHeadingMap, ...headingMap };

  const resolver = new RichTextResolver();
</script>

{#if doc.type === 'doc' && doc.content?.length}
  <svelte:element this={as} class={clsx('rich-text', className)}>
    {#each doc.content as section}
      {#if section.type === 'paragraph'}
        {@const attributes = getAttributes?.(section) || {}}
        <p {...attributes}>{@html resolver.render(section)}</p>
      {:else if section.type === 'heading'}
        {@const attributes = getAttributes?.(section) || {}}
        {@const content = resolver.render(section)}
        <svelte:element this={headings[section.attrs.level.toString()]} {...attributes}>
          {@html content}
        </svelte:element>
      {:else if section.type === 'bullet_list'}
        {@const attributes = getAttributes?.(section) || {}}
        <ul {...attributes}>{@html resolver.render(section)}</ul>
      {:else if section.type === 'ordered_list'}
        {@const attributes = getAttributes?.(section) || {}}
        <ol {...attributes}>{@html resolver.render(section)}</ol>
      {:else if section.type === 'blockquote'}
        {@const attributes = getAttributes?.(section) || {}}
        <blockquote {...attributes}>{@html resolver.render(section)}</blockquote>
      {:else if section.type === 'horizontal_rule'}
        {@const attributes = getAttributes?.(section) || {}}
        <hr {...attributes} />
      {:else if section.type === 'blok'}
        {#each section.attrs.body as block}
          {@const attributes = getAttributes?.(section, block) || {}}
          <div {...attributes} class={clsx('block', `block-${block.component}`, attributes.class)}>
            <DynamicBlock {block} />
          </div>
        {/each}
      {/if}
    {/each}
  </svelte:element>
{/if}

<style lang="postcss">
  :global(.rich-text) :global(p):not([class~='not-rich-text'] *) {
    @apply text-xl;
    line-height: theme('lineHeight.normal');
  }

  :global(.rich-text) :global(p):not(:where(:last-child, [class~='not-rich-text'] *)) {
    margin-bottom: 1.5ch;
  }

  :global(.rich-text) :global(b):not([class~='not-rich-text'] *) {
    font-weight: theme('fontWeight.semibold');
  }

  :global(.rich-text) :global(a):not([class~='not-rich-text'] *) {
    color: theme('colors.foreground.secondary');
    text-decoration: underline;
  }

  /* Inline code */
  :global(.rich-text) :global(code):not(:where([class~='not-rich-text'] *, [class*='language-'])) {
    font-family: theme('fontFamily.mono');
    font-size: 0.8em;
    font-weight: theme('fontWeight.medium');
    padding: 2px 4px;
    border-radius: theme('borderRadius.xs');
    border: 1px solid theme('colors.border.subtle');
    background-color: theme('colors.background.offset');
  }

  /* Lists */
  :global(.rich-text) :global(ol):not([class~='not-rich-text'] *) {
    @apply text-xl;
    line-height: theme('lineHeight.normal');

    margin-block: 2ch;
    padding-left: 1.5ch;
    list-style-type: decimal;
  }

  :global(.rich-text) :global(ul):not([class~='not-rich-text'] *) {
    @apply text-xl;
    line-height: theme('lineHeight.normal');
    margin-block: 2ch;
    padding-left: 1.5ch;
    list-style-type: disc;
  }

  :global(.rich-text) :global(ul):not([class~='not-rich-text'] *) {
    margin-bottom: 0.8ch;
  }

  :global(.rich-text) :global(ol ol):not([class~='not-rich-text'] *),
  :global(.rich-text) :global(ol ol):not([class~='not-rich-text'] *),
  :global(.rich-text) :global(ul ol):not([class~='not-rich-text'] *),
  :global(.rich-text) :global(ul ul):not([class~='not-rich-text'] *) {
    margin-top: 0.8ch;
  }

  :global(.rich-text) :global(ol > li):not([class~='not-rich-text'] *)::marker {
    color: theme('colors.foreground.tertiary');
  }

  :global(.rich-text) :global(ul > li):not([class~='not-rich-text'] *) {
    list-style-type: none;
    position: relative;
  }

  :global(.rich-text) :global(ul > li):not([class~='not-rich-text'] *)::before {
    content: '';
    position: absolute;
    top: 10px;
    left: -1.5ch;
    width: 1ch;
    height: 1ch;
    background-color: theme('colors.foreground.tertiary');
    mask-image: url('data:image/svg+xml;utf8,<svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8c1.958 0 3.5-1.495 3.5-3.394S5.958 0 4 0 .5 2.707.5 4.606 2.042 8 4 8Z" fill="currentColor"/></svg>');
    mask-repeat: no-repeat;
    mask-position: center center;
  }

  /* Blockquote */
  :global(.rich-text) :global(blockquote):not([class~='not-rich-text'] *) {
    @apply text-xl;
    line-height: theme('lineHeight.normal');
    background-color: theme('colors.background.offset');
    padding: 24px;
    border-radius: theme('borderRadius.md');

    margin-block: 32px;
  }

  /* H2 */
  :global(.rich-text) :global(h2):not([class~='not-rich-text'] *) {
    @apply text-3xl;
    font-weight: theme('fontWeight.semibold');
    margin-bottom: 1ch;
  }

  :global(.rich-text) :global(h2):not(:where([class~='not-rich-text'] *, :first-child)) {
    margin-top: 3.5ch;
  }

  /* H3 */
  :global(.rich-text) :global(h3):not([class~='not-rich-text'] *) {
    @apply text-2xl;
    font-weight: theme('fontWeight.semibold');
    margin-bottom: 1ch;
  }

  :global(.rich-text) :global(h3):not(:where([class~='not-rich-text'] *, :first-child)) {
    margin-top: 3ch;
  }

  /* H4 */
  :global(.rich-text) :global(h4):not([class~='not-rich-text'] *) {
    @apply text-xl;
    font-weight: theme('fontWeight.semibold');
    margin-bottom: 1ch;
  }

  :global(.rich-text) :global(h4):not(:where([class~='not-rich-text'] *, :first-child)) {
    margin-top: 2ch;
  }

  /* HR */
  :global(.rich-text) :global(hr):not([class~='not-rich-text'] *) {
    border: none;

    margin-block: 32px;
    height: 20px;
    background-color: theme('colors.foreground.DEFAULT');
    mask-image: url('data:image/svg+xml;utf8,<svg width="52" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12c1.958 0 3.5-1.495 3.5-3.394S9.958 4 8 4 4.5 6.707 4.5 8.606C4.5 10.506 6.042 12 8 12ZM26 12c1.958 0 3.5-1.495 3.5-3.394S27.958 4 26 4s-3.5 2.707-3.5 4.606c0 1.9 1.542 3.394 3.5 3.394ZM44 12c1.958 0 3.5-1.495 3.5-3.394S45.958 4 44 4s-3.5 2.707-3.5 4.606c0 1.9 1.542 3.394 3.5 3.394Z" fill="black"/></svg>');
    mask-repeat: no-repeat;
    mask-position: center center;
  }

  /* Blocks */
  :global(.rich-text) .block {
    margin-block: 40px;
  }

  :global(.rich-text) > :first-child {
    margin-top: 0;
  }

  :global(.rich-text) > :last-child {
    margin-bottom: 0;
  }
</style>
