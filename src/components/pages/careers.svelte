<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { CareersPageStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let page: CareersPageStoryblok;

  let offsetX = (page.canvas_width || 0) / 2;
  let offsetY = (page.canvas_height || 0) / 2;

  const draggable = (node: HTMLElement) => {
    let moving = false;

    node.scrollLeft = (node.scrollWidth - node.clientWidth) / 2;
    node.scrollTop = (node.scrollHeight - node.clientHeight) / 2;

    let left = node.scrollLeft;
    let top = node.scrollTop;

    node.addEventListener('mousedown', () => {
      moving = true;
      node.style.cursor = 'grabbing';
    });

    node.addEventListener('mousemove', (e) => {
      if (moving) {
        left -= e.movementX;
        top -= e.movementY;

        node.scrollLeft = left;
        node.scrollTop = top;

        node.style.userSelect = 'none';
      }
    });

    node.addEventListener('mouseup', () => {
      moving = false;
      node.style.cursor = 'grab';
    });
  };
</script>

<Seo />
<main>
  <section use:draggable class="cursor-grab overflow-hidden" style="height: calc(100vh - 76px);">
    <div
      style="width: {page.canvas_width || 0}px; height: {page.canvas_height || 0}px;"
      class="relative"
    >
      <div
        class="absolute inset-0"
        style="background-image: radial-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 24px 24px;"
      />

      <h1 class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-8xl">
        {page.page_title}
      </h1>

      {#each page.canvas_items || [] as group}
        <div
          use:storyblokEditable={group}
          class="absolute"
          style="width: {group.width}px; height: {group.height}px; left: {group.left
            ? +group.left + offsetX
            : 0}px; top: {group.top ? +group.top + offsetY : 0}px;"
        >
          {#each group.items || [] as item}
            {#if item.component === 'timeline-image'}
              {#if item.image?.filename}
                {@const { src, alt, width, height } = getImageAttributes(item.image)}
                <div
                  class="absolute"
                  style="width: {+width / 2}px; height: {+height / 2}px; left: {item.left ||
                    0}px; top: {item.top || 0}px; transform: scale({item.scale ||
                    1}) rotate({item.rotate || 0}deg)"
                >
                  <img
                    {src}
                    {alt}
                    {width}
                    {height}
                    class={clsx(item.border && 'border-[10px] border-white drop-shadow')}
                  />
                </div>
              {/if}
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </section>
</main>
