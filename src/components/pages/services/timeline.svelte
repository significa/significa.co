<script lang="ts">
  import clsx from 'clsx';
  import TimelineCell from './timeline-cell.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ServiceTimelineRowStoryblok } from '$types/bloks';
  import { CircleButton } from '@significa/svelte-ui';

  export let timeline: ServiceTimelineRowStoryblok[];

  // Desktop
  let layoutReference: HTMLElement;
  let drag: number;
  let dragging = false;

  $: referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
  $: referenceRight = layoutReference?.getBoundingClientRect().right;

  const onDrag = (e: MouseEvent) => {
    if (!dragging || !referenceLeft) return;
    drag = Math.min(Math.max(e.clientX, referenceLeft), referenceRight);
  };

  // Mobile
  let mobileNeedle: HTMLElement;
  let section: HTMLElement;
  let sticky: HTMLElement;
  let scroll: number;
  let h: number;

  $: mobileNeedleReference =
    mobileNeedle?.getBoundingClientRect().left + mobileNeedle?.clientWidth / 2;

  const update = (node: HTMLElement) => {
    h = 1536 - node.offsetWidth;

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
    referenceRight = layoutReference?.getBoundingClientRect().right - 16;
    drag = layoutReference?.getBoundingClientRect().left - 16;
    mobileNeedleReference =
      mobileNeedle?.getBoundingClientRect().left + mobileNeedle?.clientWidth / 2;
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

<!-- <section class={clsx('relative hidden py-16 lg:block', $$restProps.class)}>
  {#if layoutReference}
    <CircleButton
      aria-hidden="true"
      class="handler absolute top-0 z-20 hidden -translate-x-[calc(50%-2px)] cursor-ew-resize bg-foreground text-background transition-none hover:opacity-100 lg:flex"
      icon="comparison"
      style="left:{drag || referenceLeft}px"
    />
    <div
      class="absolute top-1/2 z-10 hidden h-full w-1 -translate-y-1/2 bg-foreground lg:block"
      style="left:{drag || referenceLeft}px"
    />
  {/if}

  {#each timeline || [] as row}
    <div class="border-b" use:storyblokEditable={row}>
      <div class="overflow-scroll">
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
    </div>
  {/each}
</section> -->

<!-- Mobile -->
<section
  bind:this={section}
  class={clsx('relative', $$restProps.class)}
  style="height: max({sticky?.clientHeight}px, calc({sticky?.clientHeight || 0}px + {h}px));"
>
  <div
    bind:this={sticky}
    class="sticky top-0 py-16"
    style="top:calc(50vh - {sticky?.clientHeight || 0}px / 2)"
  >
    <CircleButton
      aria-hidden="true"
      class="absolute left-1/2 top-0 z-20 -translate-x-1/2 cursor-ew-resize bg-foreground text-background transition-none hover:opacity-100"
      icon="comparison"
    />
    <div
      bind:this={mobileNeedle}
      class="absolute left-1/2 top-1/2 z-10 h-full w-1 -translate-x-1/2 -translate-y-1/2 bg-foreground"
    />

    {#each timeline || [] as row}
      <div class="border-b" use:storyblokEditable={row}>
        <p class="container mx-auto px-container py-3 text-base font-semibold">
          {row.title}
        </p>

        <div class="overflow-hidden" use:update>
          <div class="container mx-auto flex min-w-[1536px] flex-col gap-5 px-container py-6">
            {#each row.subrows || [] as subrow}
              <div class="flex items-center" use:storyblokEditable={subrow}>
                <div class="flex grow gap-6 overflow-hidden">
                  {#each subrow.cells || [] as cell}
                    <TimelineCell {cell} needlePosition={mobileNeedleReference} {scroll} />
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
