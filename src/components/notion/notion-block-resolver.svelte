<script lang="ts">
  import type {
    BlockObjectResponse,
    PageObjectResponse
  } from '@notionhq/client/build/src/api-endpoints';
  import NotionCallout from '$components/notion/notion-callout.svelte';
  import NotionColumns from '$components/notion/notion-columns.svelte';
  import NotionDivider from '$components/notion/notion-divider.svelte';
  import NotionHeading from '$components/notion/notion-heading.svelte';
  import NotionParagraph from '$components/notion/notion-paragraph.svelte';
  import NotionQuote from '$components/notion/notion-quote.svelte';
  import NotionTableOfContents from '$components/notion/notion-table-of-contents.svelte';
  import NotionTodo from '$components/notion/notion-todo.svelte';
  import { renderText } from '$lib/utils/notion.js';
  import NotionTable from './notion-table.svelte';
  import NotionFile from './notion-file.svelte';
  import NotionRichText from './notion-rich-text.svelte';

  export let parent: Partial<
    (PageObjectResponse | BlockObjectResponse) & {
      children: Array<BlockObjectResponse>;
    }
  >;
</script>

{#if parent?.children}
  {#each parent.children as block}
    {#if block.type === 'bookmark'}
      <a
        class="block my-2 text-lg"
        href={block.bookmark.url}
        target="_blank"
        rel="noopener noreferrer">{block.bookmark.url}</a
      >
    {:else if block.type === 'bulleted_list_item'}
      <ul class="list-disc my-3">
        <li>
          <NotionRichText richText={block?.bulleted_list_item.rich_text} />
        </li>
      </ul>
    {:else if block.type === 'callout'}
      <NotionCallout {block} />
    {:else if block.type === 'column_list'}
      <NotionColumns {block} />
    {:else if block.type === 'divider'}
      <NotionDivider />
    {:else if block.type === 'file'}
      <NotionFile {block} />
    {:else if block.type.includes('heading') && ('heading_1' in block || 'heading_2' in block || 'heading_3' in block)}
      <NotionHeading {block} />
    {:else if block.type === 'image'}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img class="mt-8 mb-2 w-full rounded-xl" src={`/handbook/images/${block.id}`} />
      {#if block.image.caption}
        <NotionRichText richText={block.image.caption} />
      {/if}
    {:else if block.type === 'link_preview'}
      <a
        class="block my-2 text-lg"
        href={block.link_preview.url}
        target="_blank"
        rel="noopener noreferrer">{block.link_preview.url}</a
      >
    {:else if block.type === 'numbered_list_item'}
      <ol class="list-decimal">
        <li>{renderText(block?.numbered_list_item.rich_text)}</li>
      </ol>
    {:else if block.type === 'paragraph'}
      <NotionParagraph {block} />
    {:else if block.type === 'quote'}
      <NotionQuote {block} />
    {:else if block.type === 'table'}
      <NotionTable {block} />
    {:else if block.type === 'table_of_contents'}
      <NotionTableOfContents
        titles={parent?.children?.filter(({ type }) => type.includes('heading'))}
      />
    {:else if block.type === 'to_do'}
      <NotionTodo {block} />
    {/if}

    {#if block.type !== 'column_list' && block.has_children}
      <svelte:self parent={block} />
    {/if}
  {/each}
{/if}
