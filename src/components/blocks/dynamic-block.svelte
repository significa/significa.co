<script lang="ts" context="module">
  import Comparison from './comparison.svelte';
  import ImageGrid from './image-grid.svelte';
  import Image from './image.svelte';

  const map = {
    image: Image,
    comparison: Comparison,
    'image-grid': ImageGrid,
    'richtext-code-block': RichTextCodeBlock
  };

  export type Blocks = keyof typeof map;

  const isBlock = (block: { component: string }): block is { component: Blocks } => {
    return !!block.component && block.component in map;
  };
</script>

<script lang="ts">
  import { dev } from '$app/environment';
  import type { ComponentType } from 'svelte';
  import RichTextCodeBlock from './rich-text-code-block.svelte';

  export let block: { component: string };

  const component: ComponentType | null = isBlock(block) ? map[block.component] : null;

  if (!component && dev) {
    console.error('Uncaught component', block.component);
  }
</script>

{#if component}
  <svelte:component this={component} {block} {...$$restProps} />
{/if}
