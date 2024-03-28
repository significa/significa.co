<script lang="ts">
  import VerticalListEntry from '$components/vertical-list-entry.svelte';
  import type { VerticalListStoryblok } from '$types/bloks';
  import airplane from '$assets/airplane.svg';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { intersectionObserver } from '$lib/actions/instersection-observer';

  export let block: VerticalListStoryblok;
  let visibleElement: HTMLDivElement;
  let isVerticalListVisible = false;

  let scrollY = 0;
  let windowWidth = 0;
  let windowHeight = 0;
  let section: HTMLDivElement;
  let isVisible = false;
  let ticks: number;

  /*
   * We are using a quadratic equation to give the airplane a parabolic motion.
   * The equation for this is y = ax^2, where:
   *   y is the vertical component of the movement
   *   x is the horizontal component of the movement
   *   a is a constant that controls how concave is the parabola
   */

  // Normalizing the x variable in our quadratic equation to make sure it's zero when the airplane
  // is fully visible and grows as the user scrolls down
  $: x = scrollY - (section?.offsetTop - windowHeight + section?.getBoundingClientRect()?.height);

  let a: number = 0.01;

  // Number of frames of the animation, which correlate to the number of pixels scrolled in the Y axis.
  // That way the animation finished when the user scrolls the height of this section
  $: ticks = section?.getBoundingClientRect().height;

  // Calculating the rate of advance in relation to the window width to make sure that the
  // airplane always flies through the entire screen
  // This velocity will not only affect how fast the airplane travels in the X axis but also how
  // concave is the parabolic movement
  $: velocity = ticks / windowWidth;
</script>

<svelte:window bind:scrollY bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if block.entry}
  <div
    bind:this={section}
    class="h-[25vh] xl:h-[40vh] relative overflow-x-clip"
    use:storyblokEditable={block}
    use:intersectionObserver={[(entry) => (isVisible = entry.isIntersecting), { threshold: 0.0 }]}
  >
    <img
      alt=""
      src={airplane}
      draggable="false"
      class="absolute bottom-0 w-32 xl:w-auto"
      style={isVisible && x > 0
        ? `transform: translate(${x / velocity}px, ${-(Math.pow(x, 2) * (a * velocity))}px);`
        : ''}
    />
  </div>

  <div
    class="relative"
    use:intersectionObserver={[
      (entry) => {
        isVerticalListVisible = entry.isIntersecting;
      },
      { threshold: 0.42 }
    ]}
  >
    {#if isVerticalListVisible}
      <div
        aria-hidden="true"
        class={'hidden md:block absolute -z-10 bg-background-offset transition-all ease-smooth w-full'}
        style={`height:${visibleElement?.offsetHeight}px;top: ${visibleElement?.offsetTop}px;`}
      />
    {/if}
    {#each block.entry as entry}
      <VerticalListEntry {entry} on:visible={({ detail: element }) => (visibleElement = element)} />
    {/each}
  </div>
{/if}
