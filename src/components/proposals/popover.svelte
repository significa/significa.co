<script lang="ts">
  import clsx from 'clsx';

  export let variant: 'fit-content' | 'default' = 'default';
  let visible: boolean = false;
</script>

<div class="{$$restProps.class || ''} relative">
  <button
    class="cursor-pointer text-left"
    on:mouseenter={() => (visible = true)}
    on:mouseleave={() => (visible = false)}
    on:touchstart={() => (visible = !visible)}
    on:keydown={(event) => {
      if (event.key === 'Escape') visible = false;
      if (event.key === 'Enter' || event.key === 'Space') visible = true;
    }}
  >
    <slot name="target" />
  </button>
  {#if $$slots['popover']}
    <div
      class={clsx(
        'absolute top-0 z-10 p-4',
        ' bg-background text-foreground-secondary',
        'rounded-2xs border transition-all',
        visible ? 'block opacity-100' : 'top-4 opacity-0',
        variant === 'default'
          ? 'left-[25%] w-72 lg:-left-[90%] lg:-top-[90%]'
          : 'left-1/2 w-auto -translate-x-1/2 -translate-y-full text-center '
      )}
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
