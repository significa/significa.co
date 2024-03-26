<script lang="ts">
  import VerticalListEntry from '$components/vertical-list-entry.svelte';
  import type { VerticalListStoryblok } from '$types/bloks';
  import airplane from '$assets/airplane.svg';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { onMount } from 'svelte';
  import { intersectionObserver } from '$lib/actions/instersection-observer';

  export let block: VerticalListStoryblok;

  // console.log(Math.sin)

  let y = 0;
  let windowWidth = 0;
  let windowHeight = 0;
  let section: HTMLDivElement;
  let sectionTopHeight = 0;
  let isVisible = false;
  let pixelToComplete = 640;
  let imageElement: HTMLImageElement;

  // y = sin(x)

  $: scrollY =
    y - (sectionTopHeight - windowHeight + section?.getBoundingClientRect()?.height) || 0;

  $: xRate = (1 * pixelToComplete) / windowWidth;

  $: console.log(xRate);

  onMount(() => {
    const onResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      sectionTopHeight = section?.offsetTop || 0;
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<svelte:window bind:scrollY={y} />

{#if block.entry}
  <div
    bind:this={section}
    class="h-[50vh] relative"
    use:storyblokEditable={block}
    use:intersectionObserver={[(entry) => (isVisible = entry.isIntersecting), { threshold: 0.15 }]}
  >
    <img
      bind:this={imageElement}
      alt=""
      src={airplane}
      draggable="false"
      class="absolute bottom-0"
      style={isVisible &&
      scrollY > 0 &&
      scrollY + imageElement?.getBoundingClientRect()?.width < windowWidth
        ? `transform: translate(${scrollY / xRate}px,${-(Math.pow(scrollY, 2) * 0.003)}px);`
        : 'display:none;'}
    />
  </div>
  <div>
    {#each block.entry as entry}
      <VerticalListEntry {entry} />
    {/each}
  </div>
{/if}
