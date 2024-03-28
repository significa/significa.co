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
        'absolute z-10 top-0 p-4',
        ' bg-background text-foreground-secondary',
        'border rounded-2xs transition-all',
        visible ? 'block opacity-100' : 'opacity-0 top-4',
        variant === 'default'
          ? 'w-72 left-[25%] lg:-top-[90%] lg:-left-[90%]'
          : 'w-auto -translate-y-full -translate-x-1/2 left-1/2 text-center '
      )}
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
