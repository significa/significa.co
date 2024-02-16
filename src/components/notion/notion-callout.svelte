<script lang="ts">
  import { renderImg } from '$lib/utils/notion';
  import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
  import NotionRichText from './notion-rich-text.svelte';

  export let block: CalloutBlockObjectResponse;
</script>

<div class="flex flex-row gap-3">
  {#if block.callout.icon?.type === 'emoji'}
    <p class="w-4">{block.callout.icon.emoji}</p>
  {:else if block.callout.icon?.type === 'external'}
    {@const img = renderImg(block.callout.icon)}
    <img class="w-4 h-auto" src={img.src} alt={img.caption} />
  {/if}
  <div>
    <NotionRichText richText={block?.callout.rich_text} />
  </div>
</div>
