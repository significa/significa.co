<script lang="ts">
  import clsx from 'clsx';
</script>

<div class="group relative inline-block">
  <div role="tooltip" class="cursor-default">
    <slot name="target" />
  </div>
  {#if $$slots['popover']}
    <div
      class={clsx(
        'absolute z-10 -top-[90%] -left-[97%] w-72 p-4',
        'invisible group-hover:visible group-hover:opacity-100 transition-opacity opacity-0 bg-background',
        'border rounded-2xs'
      )}
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
