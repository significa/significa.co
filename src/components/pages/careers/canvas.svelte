<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { CanvasGroupStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import Media from './canvas-items/media.svelte';
  import Arrow from './canvas-items/arrow.svelte';
  import Text from './canvas-items/text.svelte';
  import YellowSticker from './canvas-items/yellow-sticker.svelte';
  import Team from './canvas-items/team.svelte';
  import TalkBalloon from './canvas-items/talk-balloon.svelte';
  import Checklist from './canvas-items/checklist.svelte';
  import Tarot from './canvas-items/tarot.svelte';
  import Tictactoe from './canvas-items/tictactoe.svelte';
  import type { TeamMemberPage } from '$lib/content';
  import { dragScrolling } from '$lib/actions/drag-scrolling';
  import Plant from './canvas-items/plant.svelte';
  import Egg from './canvas-items/egg.svelte';
  import EggHatching from './canvas-items/egg-hatching.svelte';

  const MINIMAP_W = 128;
  const MINIMAP_PADDING = 0;

  export let withMouseDragScroll = false;
  export let title: string | undefined = undefined;
  export let height = 0;
  export let width = 0;
  export let items: CanvasGroupStoryblok[] | undefined;
  export let teamMembers: TeamMemberPage[] | undefined;
  export let hideMap = false;

  let container: HTMLElement;
  $: if (container) {
    handleResize();
  }

  let squareW = 0;
  let squareH = 0;

  let boxLeft = 0;
  let boxTop = 0;

  let offsetX = (width || 0) / 2;
  let offsetY = (height || 0) / 2;

  const handleResize = () => {
    const vw = container.clientWidth;
    const vh = container.clientHeight;

    const aspect = width / height;

    squareW = (vw * (MINIMAP_W - MINIMAP_PADDING)) / width;
    squareH = (vh * (MINIMAP_W - MINIMAP_PADDING) * aspect) / height;
  };

  const scrollPosition = (node: HTMLElement, update: (left: number, top: number) => void) => {
    if (!hideMap) {
      const handle = () => {
        const scrollLeft = (squareW / node.clientWidth) * node.scrollLeft;
        const scrollTop = (squareH / node.clientHeight) * node.scrollTop;

        update(scrollLeft, scrollTop);
      };

      node.addEventListener('scroll', handle);

      return {
        destroy() {
          node.removeEventListener('scroll', handle);
        }
      };
    }
  };
</script>

<svelte:window on:resize={handleResize} />

<div
  bind:this={container}
  use:dragScrolling={{
    isActive: withMouseDragScroll,
    centerYOffset: -240
  }}
  use:scrollPosition={(left, top) => {
    boxLeft = left;
    boxTop = top;
  }}
  style={$$restProps.style}
  class={$$restProps.class}
>
  {#if !hideMap}
    <div
      class="absolute bottom-4 right-4 z-10 w-32 rounded-sm border border-foreground/50 bg-foreground/50 drop-shadow-md backdrop-blur-md"
      style="aspect-ratio: {width} / {height}"
    >
      <div
        class="absolute rounded-sm bg-foreground/50 backdrop-blur-sm"
        style="width: {squareW}px; height: {squareH}px; left:{boxLeft}px; top:{boxTop}px"
      />
    </div>
  {/if}

  <div
    class={clsx('relative mx-auto select-none', $$restProps.class)}
    style="width: {width || 0}px; height: {height ||
      0}px; background-image: radial-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 24px 24px;"
  >
    <h1 class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl">
      {title}
    </h1>

    {#each items || [] as group}
      <div
        use:storyblokEditable={group}
        class="absolute"
        style="width: {group.width}px; height: {group.height}px; left: {group.left
          ? +group.left + offsetX
          : 0}px; top: {group.top ? +group.top + offsetY : 0}px;"
      >
        {#each group.items || [] as item}
          {#if item.component === 'canvas-media'}
            <Media {item} />
          {:else if item.component === 'timeline-arrow'}
            <Arrow {item} />
          {:else if item.component === 'timeline-text'}
            <Text {item} />
          {:else if item.component === 'canvas-yellow-sticker'}
            <YellowSticker {item} />
          {:else if item.component === 'canvas-team'}
            <Team {item} {teamMembers} />
          {:else if item.component === 'canvas-talk-balloon'}
            <TalkBalloon {item} />
          {:else if item.component === 'canvas-checklist'}
            <Checklist {item} />
          {:else if item.component === 'canvas-tarot'}
            <Tarot {item} />
          {:else if item.component === 'canvas-tictactoe'}
            <Tictactoe {item} />
          {:else if item.component === 'canvas-plant'}
            <Plant {item} />
          {:else if item.component === 'canvas-egg'}
            <Egg {item} />
          {:else if item.component === 'canvas-egg-hatching'}
            <EggHatching {item} />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
