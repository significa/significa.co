<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { TableStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: TableStoryblok;
</script>

<table
  class={clsx(
    'table w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border border-border group-[.rich-text]:my-10',
    $$restProps.class
  )}
  use:storyblokEditable={block}
>
  {#if block.table?.thead}
    <thead>
      <tr>
        {#each block.table.thead as th}
          <th
            class="bg-background-offset/60 p-3 text-left font-medium [&:not(:last-child)]:border-r"
            >{th.value}</th
          >
        {/each}
      </tr>
    </thead>
  {/if}
  {#if block.table?.tbody}
    <tbody>
      {#each block.table.tbody as tr}
        <tr>
          {#each tr.body as td}
            <td
              class="border-t border-border p-3 first:text-foreground-secondary [&:not(:last-child)]:border-r"
              >{td.value}</td
            >
          {/each}
        </tr>
      {/each}
    </tbody>
  {/if}
</table>
