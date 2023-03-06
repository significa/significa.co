<script lang="ts">
  import { clsx } from 'clsx';
  import { RichTextResolver, type ISbRichtext } from '@storyblok/js';
  import DynamicBlock from './blocks/dynamic-block.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Section = NonNullable<ISbRichtext['content']>[number];
  type Block = NonNullable<Section['attrs']['body']>[number];

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    doc: ISbRichtext;
    getAttributes?: (section: Section, block?: Block) => Partial<Record<string, string>>;
    as?: string;
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let doc: $$Props['doc'];
  export let getAttributes: $$Props['getAttributes'] = () => ({});
  export let as: $$Props['as'] = 'div';

  const resolver = new RichTextResolver();
</script>

{#if doc.type === 'doc' && doc.content?.length}
  <svelte:element this={as} class={clsx('@container rich-text', className)}>
    {#each doc.content as section}
      {#if section.type === 'paragraph' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <p {...attributes}>{@html resolver.render(section)}</p>
      {:else if section.type === 'heading' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        {@const content = resolver.render(section)}
        <svelte:element this={`h${[section.attrs.level.toString()]}`} {...attributes}>
          {@html content}
        </svelte:element>
      {:else if section.type === 'bullet_list' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <ul {...attributes}>{@html resolver.render(section)}</ul>
      {:else if section.type === 'ordered_list' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <ol {...attributes}>{@html resolver.render(section)}</ol>
      {:else if section.type === 'blockquote' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <blockquote {...attributes}>{@html resolver.render(section)}</blockquote>
      {:else if section.type === 'horizontal_rule'}
        {@const attributes = getAttributes?.(section) || {}}
        <hr {...attributes} />
      {:else if section.type === 'blok'}
        {#each section.attrs.body as block}
          {@const attributes = getAttributes?.(section, block) || {}}
          <DynamicBlock
            {block}
            {...attributes}
            class={clsx('block', `block-${block.component}`, attributes.class)}
          />
        {/each}
      {/if}
    {/each}
  </svelte:element>
{/if}
