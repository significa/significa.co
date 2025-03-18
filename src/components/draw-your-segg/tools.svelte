<script lang="ts">
  import clsx from 'clsx';
  import Brush from './brush.svelte';
  import { tools } from './config';
  import Pencil from './pencil.svelte';
  import type { Tool } from './types';

  export let currentTool: Tool;
</script>

<div class="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-end justify-between">
  {#each Object.values(tools) as tool}
    <button
      class={clsx(
        'flex h-10 w-10 items-start justify-center transition-all duration-200 ease-motion',
        'hover:h-14',
        tool.name === currentTool.name && 'h-14'
      )}
      on:click={() => (currentTool = tool)}
    >
      <div class="">
        {#if tool.name === 'pencil'}
          <Pencil />
        {:else}
          <Brush color={tool.color} />
        {/if}
      </div>
    </button>
  {/each}
</div>
