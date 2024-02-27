<script lang="ts">
  import { renderText } from '$lib/utils/notion';
  import { slugify } from '$lib/utils/paths';
  import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
  import { Link } from '@significa/svelte-ui';
  import NotionRichText from './notion-rich-text.svelte';

  export let titles: BlockObjectResponse[];
</script>

<div class="fixed right-4 top-24 flex flex-col text-sm">
  {#each titles as title}
    {#if title.type === 'heading_1'}
      <Link class="my-1" href={`#${slugify(renderText(title.heading_1?.rich_text))}`}>
        <NotionRichText richText={title.heading_1?.rich_text} />
      </Link>
    {:else if title.type === 'heading_2'}
      <Link class="ml-4 my-1" href={`#${slugify(renderText(title.heading_2?.rich_text))}`}>
        <NotionRichText richText={title.heading_2?.rich_text} />
      </Link>
    {:else if title.type === 'heading_3'}
      <Link class="ml-8 my-1" href={`#${slugify(renderText(title.heading_3?.rich_text))}`}>
        <NotionRichText richText={title.heading_3?.rich_text} />
      </Link>
    {/if}
  {/each}
</div>
