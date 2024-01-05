<script lang="ts">
</script>

<div class="group relative inline-block">
  <div role="tooltip" class="underline decoration-dashed cursor-default">
    <slot name="target" />
  </div>
  {#if $$slots['popover']}
    <div
      class="absolute invisible group-hover:visible transition-opacity opacity-0 group-hover:opacity-100 p-4 border rounded-2xs bg-background w-72 z-10 -top-full -left-full"
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
