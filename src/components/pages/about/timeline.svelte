<script lang="ts">
  import { distanceToTop } from '$lib/actions/distance-to-top';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { AboutPageStoryblok, TimelineArrowStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { onMount } from 'svelte';

  type Arrows = TimelineArrowStoryblok['variant'];
  const files = import.meta.glob('./arrows/*.svg', { as: 'raw', eager: true });
  const arrows = Object.entries(files).reduce((acc, [path, file]) => {
    const name = path.replace('./arrows/', '').replace('.svg', '') as Arrows;
    acc[name] = file;
    return acc;
  }, {} as Record<Arrows, string>);

  export let timeline: AboutPageStoryblok['timeline'];

  // the total width of the timeline (based on the width of each section)
  $: width = timeline?.reduce((acc, section) => acc + (+section.width || 300), 0) || 0;

  let y = 0; // scroll amount
  let top = 0; // timeline distance to top of document
  let windowWidth = 0; // the full width of the window

  // to find the left padding of the container
  let containerSource: HTMLDivElement;
  let padding = 0;
  onMount(() => {
    const setPadding = () => {
      padding = containerSource?.getBoundingClientRect().left || 0;
    };

    setPadding();
    window.addEventListener('resize', setPadding);

    return () => {
      window.removeEventListener('resize', setPadding);
    };
  });

  // scroll easing
  let eased = 0;
  const ease = () => {
    eased = eased + (y - eased) * 0.8;
    frame = window.requestAnimationFrame(ease);
  };
  let frame: number;
  onMount(() => {
    frame = window.requestAnimationFrame(ease);
    return () => {
      window.cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:window bind:scrollY={y} />

<div class="container mx-auto px-container" bind:clientWidth={windowWidth}>
  <div bind:this={containerSource} />
</div>
<div
  use:distanceToTop={(distance) => (top = distance)}
  class="relative"
  style="height: {width + padding * 2 - windowWidth / 2}px;"
>
  <div
    class="sticky overflow-hidden"
    style="padding-inline: {padding}px; top: calc(50vh - 800px / 2)"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0"
      style="background-image: radial-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 32px 32px;"
    />
    <div class="flex h-[800px]" style="transform: translateX({Math.max(0, eased - top) * -1}px);">
      {#each timeline || [] as section}
        <div
          use:storyblokEditable={section}
          class="relative flex-shrink-0"
          style="width: {section.width || 300}px;"
        >
          {#each section.items || [] as item}
            {#if item.component === 'timeline-arrow'}
              <div
                class="absolute text-foreground-secondary"
                style="left: {item.left || 0}px; top: {item.top ||
                  0}px; transform: scale({item.scale || 1}) rotate({item.rotate || 0}deg)"
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
                  0}px;"
              >
                <p class="font-comic text-sm">{item.text}</p>
                {#if item.link?.[0]}
                  {@const { href, target, rel } = getAnchorFromCmsLink(item.link[0].link)}
                  <Button size="sm" as="a" {href} {rel} {target} class="mt-4">
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
