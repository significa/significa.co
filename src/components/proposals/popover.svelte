<script lang="ts">
  import clsx from 'clsx';
  import { clickOutside } from '@significa/svelte-ui/actions';

  let visible: boolean = false;
</script>

<div class="relative">
  <button
    class="cursor-pointer"
    on:click={() => (visible = true)}
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
        'absolute z-10 top-0 left-[30%] lg:-top-[90%] lg:-left-[150%] xl:-left-[100%] w-72 p-4',
        'transition-opacity bg-background',
        'border rounded-2xs',
        visible ? 'block opacity-100' : 'hidden opacity-0'
      )}
      use:clickOutside={() => (visible = false)}
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
