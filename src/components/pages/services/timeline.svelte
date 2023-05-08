<script lang="ts">
  import clsx from 'clsx';
  import TimelineCell from './timeline-cell.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ServiceTimelineRowStoryblok } from '$types/bloks';
  import { CircleButton } from '@significa/svelte-ui';

  export let timeline: ServiceTimelineRowStoryblok[];

  const TIMLINE_FIXED_WIDTH = 1536 as const;

  let layoutReference: HTMLElement;

  let drag: number;
  let dragging = false;

  let needle: HTMLElement;
  let section: HTMLElement;
  let sticky: HTMLElement;
  let overflowContainer: HTMLElement;

  let scroll: number;
  let h: number;

  $: stickyHeight = sticky?.clientHeight || 0;
  $: referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
  $: referenceRight = Math.min(
    overflowContainer?.clientWidth - 16,
    layoutReference?.getBoundingClientRect().left + layoutReference?.clientWidth
  );
  $: needleReference = needle?.getBoundingClientRect().left + needle?.clientWidth / 2;

  const onDrag = (e: MouseEvent) => {
    if (!dragging || !referenceLeft) return;
    drag = Math.min(Math.max(e.clientX, referenceLeft), referenceRight);
  };

  const update = (node: HTMLElement) => {
    h = TIMLINE_FIXED_WIDTH - node.offsetWidth;

    window.addEventListener('scroll', () => {
      node.scrollLeft = Math.max(
        0,
        scroll - (section ? section.offsetTop : 0) + (window.innerHeight - sticky?.clientHeight) / 2
      );
    });
  };
</script>

<svelte:window
  on:resize={() => {
    referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
    referenceRight = Math.min(
      overflowContainer?.clientWidth - 16,
      layoutReference?.getBoundingClientRect().left + layoutReference?.clientWidth
    );
    stickyHeight = sticky?.clientHeight || 0;

    drag = 0;

    needleReference = needle?.getBoundingClientRect().left + needle?.clientWidth / 2;

    h = TIMLINE_FIXED_WIDTH - overflowContainer.offsetWidth;
  }}
  on:mousedown={(e) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('handler')) {
      dragging = true;
    }
  }}
  on:mouseup={() => (dragging = false)}
  on:mousemove={onDrag}
  bind:scrollY={scroll}
/>

<section
  bind:this={section}
  class={clsx('relative', $$restProps.class)}
  style="height: max({stickyHeight}px, calc({stickyHeight}px + {h}px));"
>
  <div bind:this={sticky} class="sticky top-0 py-16" style="top:calc(50vh - {stickyHeight}px / 2)">
    <CircleButton
      aria-hidden="true"
      class="handler absolute top-0 z-20 -translate-x-1/2 cursor-ew-resize bg-foreground text-background transition-none hover:opacity-100"
      icon="comparison"
      style="left:{drag ? drag + 'px' : '50%'}"
    />
    <div
      bind:this={needle}
      class="absolute top-1/2 z-10 h-full w-1 -translate-x-1/2 -translate-y-1/2 bg-foreground"
      style="left:{drag ? drag + 'px' : '50%'}"
    />

    {#each timeline || [] as row}
      <div class="border-b" use:storyblokEditable={row}>
        <p class="container mx-auto px-container py-3 text-base font-semibold lg:hidden">
          {row.title}
        </p>

        <div class="overflow-hidden" use:update bind:this={overflowContainer}>
          <div
            class="container mx-auto flex flex-col gap-5 px-container py-6"
            style="min-width: {TIMLINE_FIXED_WIDTH}px;"
          >
            {#each row.subrows || [] as subrow, i}
              <div class="flex items-center" use:storyblokEditable={subrow}>
                <div class="mr-6 hidden w-28 lg:block">
                  {#if i === 0}
                    <p class="text-base font-semibold">{row.title}</p>
                  {/if}
                </div>

                <div class="flex grow gap-6 overflow-hidden" bind:this={layoutReference}>
                  {#each subrow.cells || [] as cell}
                    <TimelineCell {cell} needlePosition={drag || needleReference} {scroll} />
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
