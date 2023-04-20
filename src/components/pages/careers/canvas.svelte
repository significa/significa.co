<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { CanvasGroupStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import Photo from './canvas-items/photo.svelte';
  import Arrow from './canvas-items/arrow.svelte';
  import Text from './canvas-items/text.svelte';

  export let title: string | undefined = undefined;
  export let height: number = 0;
  export let width: number = 0;
  export let items: CanvasGroupStoryblok[] | undefined;

  let offsetX = (width || 0) / 2;
  let offsetY = (height || 0) / 2;

  const dragScrolling = (node: HTMLElement) => {
    // moving state
    let moving = false;

    // overflow hidden allows forced scroll which is really nice
    node.style.overflow = 'hidden';
    node.style.cursor = 'grab';

    // center
    node.scrollLeft = (node.scrollWidth - node.clientWidth) / 2;
    node.scrollTop = (node.scrollHeight - 240) / 2;

    // save initial state
    let left = node.scrollLeft;
    let top = node.scrollTop;

    node.addEventListener('mousedown', () => {
      moving = true;
      node.style.cursor = 'grabbing';
      node.style.userSelect = 'none';
    });

    node.addEventListener('mousemove', (e) => {
      if (moving) {
        left -= e.movementX;
        top -= e.movementY;

        node.scrollLeft = left;
        node.scrollTop = top;
      }
    });

    node.addEventListener('mouseup', () => {
      moving = false;
      node.style.cursor = 'grab';
      node.style.userSelect = 'unset';
    });

    // prevent stuck drag when leaving node still pressing
    node.addEventListener('mouseleave', () => {
      moving = false;
      node.style.cursor = 'grab';
      node.style.userSelect = 'unset';
    });
  };
</script>

<section use:dragScrolling style="height: min({height}px ,calc(100vh - 76px));">
  <div
    class={clsx('relative', $$restProps.class)}
    style="width: {width || 0}px; height: {height ||
      0}px; background-image: radial-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 24px 24px;"
  >
    <h1 class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-8xl">
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
          {#if item.component === 'timeline-image'}
            <Photo {item} />
          {:else if item.component === 'timeline-arrow'}
            <Arrow {item} />
          {:else if item.component === 'timeline-text'}
            <Text {item} />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</section>
