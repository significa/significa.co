<script lang="ts">
  import { distanceToTop } from '$lib/actions/distance-to-top';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { AboutPageStoryblok, TimelineArrowStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { onMount } from 'svelte';

  type Arrows = TimelineArrowStoryblok['variant'];
  const files = import.meta.glob('../../illustrations/arrows/*.svg', { as: 'raw', eager: true });
  const arrows = Object.entries(files).reduce(
    (acc, [path, file]) => {
      const name = path.replace('../../illustrations/arrows/', '').replace('.svg', '') as Arrows;
      acc[name] = file;
      return acc;
    },
    {} as Record<Arrows, string>
  );

  export let timeline: AboutPageStoryblok['timeline'];

  // the total width of the timeline (based on the width of each section)
  $: width = timeline?.reduce((acc, section) => acc + (+section.width || 300), 0) || 0;

  let y = 0; // scroll amount
  let top = 0; // timeline distance to top of document

  // to find the left padding of the container
  let containerSource: HTMLDivElement;
  let padding = 0;
  let containerWidth = 0;

  // shorter screens (height) don't go well with our 800px fixed height, so we need to scale everything by a certain factor
  let windowHeight = 0;
  $: factor = windowHeight < 800 ? windowHeight / 800 : 1;

  onMount(() => {
    const onResize = () => {
      padding = containerSource?.getBoundingClientRect().left || 0;
      containerWidth = containerSource?.clientWidth || 0;
      // save window height
      windowHeight = window.innerHeight;
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<svelte:window bind:scrollY={y} />

<div class="container mx-auto px-container">
  <div bind:this={containerSource} />
</div>
<div
  use:distanceToTop={(distance) => (top = distance)}
  class="pointer-events-none relative"
  style="height: {width - containerWidth + 800 / factor}px"
>
  <div
    class="sticky overflow-hidden"
    style="padding-left: {padding}px; top: calc(50vh - 800px / 2)"
  >
    <div aria-hidden="true" class="absolute inset-0" />
    <div
      class="flex h-[800px]"
      style="transform: translateX({Math.max(
        -width + containerWidth,
        Math.max(0, y - top - (800 / factor - windowHeight) / 2) * -1
      )}px);"
    >
      {#each timeline || [] as section}
        <div
          use:storyblokEditable={section}
          class="relative flex-shrink-0"
          style="width: {section.width || 300}px; transform: scale({factor});"
        >
          {#each section.items || [] as item}
            {#if item.component === 'timeline-arrow'}
              <!-- eslint-disable svelte/no-at-html-tags -->
              <div
                class="absolute text-foreground-secondary"
                style="left: {item.left || 0}px; top: {item.top || 0}px; transform: scale({(Number(
                  item.scale
                ) || 1) * (item.flip ? -1 : 1)} ,{item.scale || 1}) rotate({item.rotate || 0}deg)"
              >
                {@html arrows[item.variant]}
              </div>
            {:else if item.component === 'timeline-image'}
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
            {:else if item.component === 'timeline-text'}
              <div
                class="absolute max-w-xs text-center"
                style="width: {item.width || '240'}px; left: {item.left || 0}px; top: {item.top ||
                  0}px; transform: scale({1 - factor + 1})"
              >
                {#if item.title}
                  <p class="font-comic text-sm font-bold text-foreground">{item.title}</p>
                {/if}
                <p class="font-comic text-sm font-bold text-foreground-secondary">{item.text}</p>
                {#if item.link?.[0]}
                  {@const { href, target, rel } = getAnchorFromCmsLink(item.link[0].link)}
                  <Button size="sm" as="a" {href} {rel} {target} class="pointer-events-auto mt-4">
                    {item.link[0].label}
                  </Button>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
