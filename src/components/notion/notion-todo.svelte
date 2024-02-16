<script lang="ts">
  import type { ToDoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
  import NotionRichText from './notion-rich-text.svelte';

  export let block: ToDoBlockObjectResponse;
</script>

<div>
  <input type="checkbox" id={block.id} checked={block.to_do.checked} />
  <label for={block.id}>
    <NotionRichText richText={block.to_do.rich_text} />
  </label>
</div>
