<script lang="ts">
  import type { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
  import NotionRichText from './notion-rich-text.svelte';

  export let block: QuoteBlockObjectResponse;
</script>

<blockquote
  class="text-lg font-normal [&>span:not(:last-child)]:font-medium [&>span:last-child]:block [&>span:last-child]:pt-2"
>
  <NotionRichText richText={block.quote.rich_text} />
</blockquote>
