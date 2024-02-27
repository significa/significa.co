<script lang="ts">
  import type { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
  import NotionRichText from './notion-rich-text.svelte';

  export let block: ParagraphBlockObjectResponse;
</script>

<p>
  <NotionRichText richText={block.paragraph?.rich_text} />
</p>
