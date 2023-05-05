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
  import Tictactoe from './canvas-items/tictactoe.svelte';
  import type { TeamMemberPage } from '$lib/content';
  import { dragScrolling } from '$lib/actions/drag-scrolling';

  export let withMouseDragScroll = false;
  export let title: string | undefined = undefined;
  export let height: number = 0;
  export let width: number = 0;
  export let items: CanvasGroupStoryblok[] | undefined;
  export let teamMembers: TeamMemberPage[] | undefined;

  let offsetX = (width || 0) / 2;
  let offsetY = (height || 0) / 2;
</script>

<div
  use:dragScrolling={{ isActive: withMouseDragScroll, centerYOffset: -240 }}
  style={$$restProps.style}
  class={$$restProps.class}
>
  <div
    class={clsx('relative mx-auto', $$restProps.class)}
    style="width: {width || 0}px; height: {height ||
      0}px; background-image: radial-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 24px 24px;"
  >
    <h1 class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl">
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
          {:else if item.component === 'canvas-tictactoe'}
            <Tictactoe {item} />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
