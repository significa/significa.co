<script lang="ts">
  import type { PhysicsRectangleCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: PhysicsRectangleCardStoryblok;
  export let ref: HTMLElement;
</script>

<div
  bind:this={ref}
  data-theme={block.theme === 'yellow' ? 'yellow' : undefined}
  class={clsx(
    'select-none whitespace-nowrap border-[1px] border-foreground-secondary',
    $$restProps.class
  )}
>
  <div class="relative p-3">
    <div class="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <div class="absolute -right-[3px] -top-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <div class="absolute -bottom-[3px] -left-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <div class="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <p class="text-3xl font-bold">{block.text}</p>
  </div>
</div>
