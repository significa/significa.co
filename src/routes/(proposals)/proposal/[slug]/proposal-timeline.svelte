<script lang="ts">
  export let data;

  const { deliverables, rows, totalMonths } = data;
</script>

<div class="grid gap-1 grid-cols-[max-content,_max-content] overflow-x-scroll py-3 relative">
  <div class="col-start-1 row-start-1"></div>
  <div class="col-start-2">
    <div class="grid gap-1 px-1 auto-cols-[20px] grid-rows-2 border-b shadow-sm">
      {#each Array(totalMonths) as _, i}
        <div class="row-start-1" style="grid-column: span 20">Month {i + 1}</div>
        {#each Array(4) as _, i}
          <div class="row-start-2 col-span-5 text-foreground-secondary text-xs uppercase">
            Week {i + 1}
          </div>
        {/each}
      {/each}
    </div>
  </div>

  <div class="row-start-2 sticky left-0 bg-background">
    {#each deliverables as deliverable}
      <div class="shadow-md rounded-xs m-1 bg-background">
        <div class="h-[36px] m-1 uppercase font-medium text-xs text-foreground-secondary px-3 py-2">
          {deliverable.title}
        </div>
        {#each deliverable?.rows as row}
          <div class="h-[36px] mb-1 text-sm px-3 py-2">{row.role}</div>
        {/each}
      </div>
    {/each}
  </div>

  <div
    class="grid gap-1 px-1 auto-cols-[20px] auto-rows-[36px]"
    style="background: linear-gradient(to right, #DDD 1px, transparent 1px); background-size: 120px;"
  >
    {#each rows as row, i}
      <div
        class="rounded-xs p-2 text-sm text-white"
        style="
          background-color: {row.color};
          grid-row: {i + 1} / span 1;
          grid-column: {row.offset + 1} / span {row.duration};"
      >
        {#if row.title}
          {row.title}
          <span>
            {row.duration} days
          </span>
        {/if}
      </div>
    {/each}
  </div>
</div>
