<script lang="ts">
  import clsx from 'clsx';
  import { Confetti } from 'svelte-confetti';
  import TimelineCell from './timeline-cell.svelte';
  import NeedleHead from './illustrations/needle-head.webp';
  import Needle from './needle.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { CONFETTI_COLOR_ARRAY } from '$lib/constants';
  import type { ServiceTimelineRowStoryblok } from '$types/bloks';

  export let timeline: ServiceTimelineRowStoryblok[];

  const TIMELINE_FIXED_WIDTH = 1536 as const;

  let layoutReference: HTMLElement;

  let drag: number;
  let dragging = false;

  let needle: HTMLElement;
  let host: HTMLElement;
  let sticky: HTMLElement;
  let overflowContainer: HTMLElement;

  let scroll: number;
  let h: number;

  let throwConfeti = false;

  $: stickyHeight = sticky?.clientHeight || 0;
  $: referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
  $: referenceRight = Math.min(
    overflowContainer?.clientWidth - 32,
    layoutReference?.getBoundingClientRect().left + layoutReference?.clientWidth
  );
  $: needleReference = needle?.getBoundingClientRect().left + needle?.clientWidth / 2;

  const onDrag = (e: MouseEvent) => {
    if (!dragging || !referenceLeft) return;
    drag = Math.min(Math.max(e.clientX, referenceLeft), referenceRight);
  };

  const update = (node: HTMLElement) => {
    h = TIMELINE_FIXED_WIDTH - node.offsetWidth;

    const handler = () => {
      node.scrollLeft = Math.max(
        0,
        scroll - (host ? host.offsetTop : 0) + (window.innerHeight - sticky?.clientHeight) / 2
      );
    };

    window.addEventListener('scroll', handler);

    return {
      destroy() {
        window.removeEventListener('scroll', handler);
      }
    };
  };
</script>

<svelte:window
  on:resize={() => {
    referenceLeft = layoutReference?.getBoundingClientRect().left - 16;
    referenceRight = Math.min(
      overflowContainer?.clientWidth - 32,
      layoutReference?.getBoundingClientRect().left + layoutReference?.clientWidth
    );
    stickyHeight = sticky?.clientHeight || 0;
    drag = 0;
    needleReference = needle?.getBoundingClientRect().left + needle?.clientWidth / 2;

    h = TIMELINE_FIXED_WIDTH - overflowContainer.offsetWidth;
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

<div
  bind:this={host}
  class={clsx('relative', $$restProps.class)}
  style="height: max({stickyHeight}px, calc({stickyHeight}px + {h}px));"
>
  <div bind:this={sticky} class="sticky top-0 py-16" style="top:calc(50vh - {stickyHeight}px / 2)">
    {#if layoutReference}
      <!-- Desktop needle -->
      {#if throwConfeti}
        <div
          class="absolute top-4 hidden lg:block"
          style="left:{drag ? drag + 'px' : referenceLeft + 'px'}; width:20px; height:50px"
        >
          <Confetti
            amount="60"
            y={[0, 1.5]}
            x={[-1, 1]}
            duration="2000"
            size="8"
            colorArray={CONFETTI_COLOR_ARRAY}
            cone
          />
        </div>
      {/if}
      <div
        class="absolute top-1/2 flex h-full -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style="left:{drag ? drag + 'px' : referenceLeft + 'px'}"
      >
        <img
          src={NeedleHead}
          alt=""
          width="69"
          height="85"
          draggable="false"
          class="handler z-20 hidden min-w-[69px] animate-shake cursor-ew-resize select-none transition-all hover:rotate-6 lg:flex"
        />
        <div bind:this={needle} class="-mt-6 hidden h-full animate-shake lg:block">
          <Needle class="h-full" />
        </div>
      </div>

      <!-- Mobile needle -->
      {#if throwConfeti}
        <div
          class="absolute top-4 lg:hidden"
          style="left:{drag ? drag + 'px' : '50%'}; width:20px; height:50px"
        >
          <Confetti
            amount="60"
            y={[0, 1.5]}
            x={[-1, 1]}
            duration="2000"
            size="8"
            colorArray={CONFETTI_COLOR_ARRAY}
            cone
          />
        </div>
      {/if}
      <img
        src={NeedleHead}
        alt=""
        width="69"
        height="85"
        draggable="false"
        class="absolute -top-3 z-20 -translate-x-1/2 select-none lg:hidden"
        style="left:{drag ? drag + 'px' : '50%'}"
      />
      <div
        bind:this={needle}
        class="absolute top-1/2 z-10 h-full w-1 -translate-x-1/2 -translate-y-1/2 bg-foreground lg:hidden"
        style="left:{drag ? drag + 'px' : '50%'}"
      />
    {/if}

    {#each timeline || [] as row}
      <div class="border-b" use:storyblokEditable={row}>
        <p class="container mx-auto px-container py-3 text-base font-semibold lg:hidden">
          {row.title}
        </p>

        <div class="overflow-hidden" use:update bind:this={overflowContainer}>
          <div
            class="container mx-auto flex flex-col gap-4 px-container py-6"
            style="min-width: {TIMELINE_FIXED_WIDTH}px;"
          >
            {#each row.subrows || [] as subrow, i}
              <div class="flex items-center" use:storyblokEditable={subrow}>
                <div class="mr-6 hidden w-28 lg:block">
                  {#if i === 0}
                    <p class="text-base font-semibold">{row.title}</p>
                  {/if}
                </div>

                <div class="flex grow gap-3" bind:this={layoutReference}>
                  {#each subrow.cells || [] as cell}
                    <TimelineCell
                      {cell}
                      {scroll}
                      needlePosition={drag || needleReference || referenceLeft}
                      bind:throwConfeti
                    />
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
