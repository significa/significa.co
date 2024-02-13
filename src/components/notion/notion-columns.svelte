<script lang="ts">
  import type {
    ColumnBlockObjectResponse,
    ColumnListBlockObjectResponse
  } from '@notionhq/client/build/src/api-endpoints';
  import NotionBlockResolver from './notion-block-resolver.svelte';

  export let block: Partial<
    ColumnListBlockObjectResponse & { children: Array<ColumnBlockObjectResponse> }
  >;
</script>

<div class="grid grid-flow-col gap-4 my-10">
  {#if block.has_children && block.children}
    {#each block?.children as children}
      <div class="flex flex-col">
        <NotionBlockResolver parent={children} />
      </div>
    {/each}
  {/if}
</div>
