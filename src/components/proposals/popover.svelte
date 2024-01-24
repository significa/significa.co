<script lang="ts">
  import clsx from 'clsx';

  let visible: boolean = false;
</script>

<div class="relative">
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
        'absolute z-10 top-0 left-[25%] lg:-top-[90%] lg:-left-[90%] w-72 p-4',
        'transition-opacity bg-background text-foreground-secondary',
        'border rounded-2xs',
        visible ? 'block opacity-100' : 'hidden opacity-0'
      )}
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
