<script lang="ts">
  import VerticalListEntry from '$components/vertical-list-entry.svelte';
  import type { VerticalListStoryblok } from '$types/bloks';
  import airplane from '$assets/airplane.svg';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { intersectionObserver } from '$lib/actions/instersection-observer';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { Button } from '@significa/svelte-ui';

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

  let a: number = 0.007;

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
  {#if block.airplane}
    <div
      bind:this={section}
      class="relative mt-24 h-[15vh] overflow-x-clip xl:h-[50vh] xl:pt-0 2xl:h-[45vh]"
      use:storyblokEditable={block}
      use:intersectionObserver={[(entry) => (isVisible = entry.isIntersecting), { threshold: 0.0 }]}
    >
      <div
        draggable="false"
        class="absolute -bottom-12 -left-[400px] w-64 xl:w-auto"
        style={isVisible && x > 0
          ? `transform: translate(${x / velocity}px, ${-(Math.pow(x, 2) * (a * velocity))}px);`
          : ''}
      >
        <img alt="" src={airplane} class="relative z-10" />
        <div
          class="absolute bottom-[24px] left-[7px] inline-flex h-fit w-fit -translate-x-full rotate-[5deg] rounded-lg bg-white shadow-xl ring-8 ring-white"
        >
          <div
            class="flex h-fit w-fit gap-3 rounded-xl border-white p-3 ring-1 ring-black"
            data-theme="light"
          >
            {#if block.link_text}
              {@const { href, target } = getAnchorFromCmsLink(block.link)}
              <Button
                {target}
                as="a"
                href={href ? href : '#estimation'}
                size="md"
                class="scroll-b w-fit">{block.link_text}</Button
              >
            {/if}
            {#if block.secondary_link_text}
              {@const { href } = getAnchorFromCmsLink(block.secondary_link)}
              <Button variant="secondary" as="a" {href} size="md" class="scroll-b w-fit"
                >{block.secondary_link_text}</Button
              >
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
  <div
    class="relative"
    use:intersectionObserver={[
      (entry) => {
        isVerticalListVisible = entry.isIntersecting;
      },
      { rootMargin: '-50%' }
    ]}
  >
    {#if isVerticalListVisible}
      <div
        aria-hidden="true"
        class={'absolute -z-10 hidden w-full bg-background-offset transition-all ease-smooth md:block'}
        style={`height:${visibleElement?.offsetHeight}px;top: ${visibleElement?.offsetTop}px;`}
      />
    {/if}
    {#each block.entry as entry}
      <VerticalListEntry {entry} on:visible={({ detail: element }) => (visibleElement = element)} />
    {/each}
  </div>
{/if}
