<script lang="ts">
  import clsx from 'clsx';
  import TimelineCell from './timeline-cell.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import { CircleButton } from '@significa/svelte-ui';

  export let timeline: NonNullable<ServicesPageStoryblok['timeline']>;

  let layoutReference: HTMLElement;
  let referenceLeft: number;
  let referenceRight: number;
  let drag: number;
  let dragging = false;

  $: referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
  $: referenceRight = layoutReference?.getBoundingClientRect().right - 16;

  const onDrag = (e: MouseEvent) => {
    if (!dragging || !referenceLeft) return;
    drag = Math.min(Math.max(e.clientX, referenceLeft), referenceRight);
  };
</script>

<svelte:window
  on:resize={() => {
    referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
    referenceRight = layoutReference?.getBoundingClientRect().right - 16;
    drag = layoutReference?.getBoundingClientRect().left - 16;
  }}
  on:mousedown={(e) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('handler')) {
      dragging = true;
    }
  }}
  on:mouseup={() => (dragging = false)}
  on:mousemove={onDrag}
/>

<section class={clsx('relative overflow-hidden py-16', $$restProps.class)}>
  {#if layoutReference}
    <CircleButton
      aria-hidden="true"
      class="handler absolute top-0 z-20 -translate-x-[calc(50%-2px)] cursor-ew-resize bg-foreground text-background transition-none hover:opacity-100"
      icon="comparison"
      style="left:{drag || referenceLeft}px"
    />
    <div
      class="absolute top-[50%] z-10 h-[100%] w-1 -translate-y-[50%] bg-foreground"
      style="left:{drag || referenceLeft}px"
    />
  {/if}

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

            <div class="flex grow gap-6 overflow-hidden" bind:this={layoutReference}>
              {#each subrow.cells || [] as cell}
                <TimelineCell {cell} needlePosition={drag || referenceLeft} />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>
