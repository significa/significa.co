<script lang="ts" context="module">
  // Monkey patch RichTextSchema.marks.link to add `sanitizeSlug`
  // TODO: Find a better alternative and be careful updating storyblok dependency
  // Patched as of https://github.com/storyblok/storyblok-js-client/blob/069d51afa8003f804ef8af5fc5b5823d2ce4a658/src/schema.ts#L133C1-L161
  RichTextSchema.marks.link = (node) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { story, uuid, linktype = 'url', ...attrs } = node.attrs;

    if (linktype === 'email') {
      attrs.href = `mailto:${attrs.href}`;
    } else if (attrs.href) {
      attrs.href = sanitizeSlug(attrs.href);
    }

    if (attrs.anchor) {
      attrs.href = `${attrs.href}#${attrs.anchor}`;
      delete attrs.anchor;
    }

    if (attrs.custom) {
      for (const key in attrs.custom) {
        attrs[key] = attrs.custom[key];
      }
      delete attrs.custom;
    }

    return {
      tag: [
        {
          tag: 'a',
          attrs: attrs
        }
      ]
    };
  };

  export const resolver = new RichTextResolver(RichTextSchema);
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import { RichTextResolver, type ISbRichtext, RichTextSchema } from '@storyblok/js';
  import DynamicBlock from './blocks/dynamic-block.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { sanitizeSlug } from '$lib/utils/paths';

  type Section = NonNullable<ISbRichtext['content']>[number];
  type Block = NonNullable<Section['attrs']['body']>[number];
  type PatternMatchString = '[#CLIENT#]' | '[#COMPANY#]';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    doc: ISbRichtext;
    getAttributes?: (section: Section, block?: Block) => Partial<Record<string, string>>;
    as?: string;
    patternMatchReplace?: [PatternMatchString, string][];
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let doc: $$Props['doc'];
  export let getAttributes: $$Props['getAttributes'] = () => ({});
  export let as: $$Props['as'] = 'div';
  export let patternMatchReplace: $$Props['patternMatchReplace'] = undefined;

  const renderSection = (section: ISbRichtext) => {
    let text: string = resolver.render(section);

    (patternMatchReplace || []).forEach((r) => {
      text = text.replace(r[0], r[1]);
    });

    return text;
  };
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{#if doc.type === 'doc' && doc.content?.length}
  <svelte:element this={as} class={clsx('rich-text @container', className)}>
    {#each doc.content as section}
      {#if section.type === 'paragraph' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <p {...attributes}>{@html renderSection(section)}</p>
      {:else if section.type === 'heading' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        {@const content = renderSection(section)}
        <svelte:element this={`h${[section.attrs.level.toString()]}`} {...attributes}>
          {@html content}
        </svelte:element>
      {:else if section.type === 'bullet_list' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <ul {...attributes}>{@html renderSection(section)}</ul>
      {:else if section.type === 'ordered_list' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <ol {...attributes}>{@html renderSection(section)}</ol>
      {:else if section.type === 'blockquote' && section.content?.length}
        {@const attributes = getAttributes?.(section) || {}}
        <blockquote {...attributes}>{@html renderSection(section)}</blockquote>
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
