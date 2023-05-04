<script lang="ts">
  import clsx from 'clsx';
  import TimelineCell from './timeline-cell.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import { onMount } from 'svelte';

  export let timeline: NonNullable<ServicesPageStoryblok['timeline']>;

  let needle: HTMLElement;
  let needlePosition: number;

  onMount(() => {
    needlePosition = needle.getBoundingClientRect().left;
  });
</script>

<section class={clsx('relative', $$restProps.class)}>
  <div class="container absolute inset-0 mx-auto px-container">
    <div
      bind:this={needle}
      class="absolute left-[400px] top-[50%] z-10 h-[120%] w-1 -translate-y-[50%] bg-foreground"
    />
  </div>

  <div class="overflow-auto">
    {#each timeline || [] as row}
      <div class="border-b" use:storyblokEditable={row}>
        <div class="container mx-auto flex min-w-[1536px] flex-col gap-5 px-container py-6">
          {#each row.subrows || [] as subrow, i}
            <div class="flex items-center" use:storyblokEditable={subrow}>
              <div class="mr-6 w-28">
                {#if i === 0}
                  <p class="text-base font-semibold">{row.title}</p>
                {/if}
              </div>

              <div class="flex gap-6 overflow-hidden">
                {#each subrow.cells || [] as cell}
                  <TimelineCell {cell} {needlePosition} />
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
