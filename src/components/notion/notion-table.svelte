<script lang="ts">
  import type {
    TableBlockObjectResponse,
    TableRowBlockObjectResponse
  } from '@notionhq/client/build/src/api-endpoints';
  import NotionRichText from './notion-rich-text.svelte';

  export let block: Partial<
    TableBlockObjectResponse & {
      children: Array<TableRowBlockObjectResponse>;
    }
  >;

  const header = block?.table?.has_column_header && block.children ? block.children[0] : undefined;
  const rows =
    block?.table?.has_column_header && block.children ? block.children.slice(1) : block.children;
</script>

{#if block.children}
  <table class="border text-left my-8 w-full">
    {#if header}
      <thead>
        <tr>
          {#each header.table_row.cells as cell}
            <th class="px-4 py-2 border bg-background-offset">
              <NotionRichText richText={cell} />
            </th>
          {/each}
        </tr>
      </thead>
    {/if}

    {#if rows}
      <tbody>
        {#each rows as row}
          <tr>
            {#each row.table_row.cells as cell, i}
              {#if block?.table?.has_row_header && i === 0}
                <th class="px-4 py-2 border bg-background-offset">
                  <NotionRichText richText={cell} />
                </th>
              {/if}
              <td class="px-4 py-2 border">
                <NotionRichText richText={cell} />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
{/if}
