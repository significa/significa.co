<script lang="ts">
  import clsx from 'clsx';
  import Brush from './brush.svelte';
  import { tools, colors } from './config';
  import Pencil from './pencil.svelte';
  import type { Tool } from './types';

  export let tool: Tool;
</script>

<div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end justify-between">
  {#each [tools.pencil, tools.black, tools.yellow, tools.grey, tools.white] as t}
    <button
      class={clsx(
        'flex h-10 w-10 items-start justify-center transition-all duration-200 ease-motion',
        'hover:h-14',
        t.color === tool.color && t.width === tool.width && 'h-14'
      )}
      on:click={() => (tool = t)}
    >
      <div class="">
        {#if t.width === 'thick'}
          <Brush color={colors[t.color]} />
        {:else}
          <Pencil />
        {/if}
      </div>
    </button>
  {/each}
</div>
