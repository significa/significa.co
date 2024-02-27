<script lang="ts">
  import { renderText } from '$lib/utils/notion';
  import { slugify } from '$lib/utils/paths';
  import type {
    Heading1BlockObjectResponse,
    Heading2BlockObjectResponse,
    Heading3BlockObjectResponse
  } from '@notionhq/client/build/src/api-endpoints';
  import NotionRichText from './notion-rich-text.svelte';

  export let block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse;
</script>

{#if block.type === 'heading_1'}
  <h1 id={slugify(renderText(block.heading_1.rich_text))}>
    <NotionRichText richText={block.heading_1.rich_text} />
  </h1>
{:else if block.type === 'heading_2'}
  <h2 id={slugify(renderText(block.heading_2.rich_text))}>
    <NotionRichText richText={block.heading_2.rich_text} />
  </h2>
{:else if block.type === 'heading_3'}
  <h3 id={slugify(renderText(block.heading_3.rich_text))}>
    <NotionRichText richText={block.heading_3.rich_text} />
  </h3>
{/if}
