<script lang="ts">
  import type { PhysicsBalloonCardStoryblok } from '$types/bloks';
  import { theme } from '$lib/stores/theme';
  import clsx from 'clsx';
  import SplitWords from '$components/split-words.svelte';

  export let block: PhysicsBalloonCardStoryblok;
  export let ref: HTMLElement;

  const parseTheme = (variant: PhysicsBalloonCardStoryblok['theme']) => {
    if (variant === 'inverted') {
      if ($theme === 'light') return 'dark';
      else if ($theme === 'dark') return 'light';
    } else if (variant === 'yellow') {
      return 'yellow';
    } else return;
  };
</script>

<div
  bind:this={ref}
  data-theme={parseTheme(block.theme)}
  class={clsx(
    'select-none rounded-xs p-4 after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto after:h-3 after:w-3 after:rotate-45 after:rounded-3xs',
    (block.theme === 'inverted' || block.theme === 'yellow') && 'bg-background after:bg-background',
    block.theme === 'panel' && 'bg-background-panel after:bg-background-panel',
    block.theme === 'offset' && 'bg-background-offset after:bg-background-offset',
    $$restProps.class
  )}
>
  {#if block.text}
    <SplitWords class="whitespace-nowrap text-xl font-medium" string={block.text} nLetters={30} />
  {/if}
</div>
