<script lang="ts">
  import type { CanvasTarotStoryblok } from '$types/bloks';
  export let item: CanvasTarotStoryblok;
  import back from '$assets/back.svg';
  import sun from '$assets/sun.svg';
  import moon from '$assets/moon.svg';
  $: flip = false;
  let timeout: ReturnType<typeof setTimeout>;
  $: cssVarStyles = `transform: rotateX(0deg) rotateY(0deg)`;
  let calculateAngle = function (e: MouseEvent) {
    const element = e.target as HTMLDivElement;
    let rect = element?.getBoundingClientRect();
    //x and y relative to the card
    let x = Math.abs(e.clientX - rect.left);
    let y = Math.abs(e.clientY - rect.top);

    // Calculate half the width and height
    let halfWidth = rect.width / 2;
    let halfHeight = rect.height / 2;

    // Changing these numbers will change the depth of the effect.
    let calcAngleX = (x - halfWidth) / 6;
    let calcAngleY = (y - halfHeight) / 6;

    cssVarStyles = `transform: rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg); perspective: ${
      halfWidth * 6
    }px`;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  role="button"
  tabindex={0}
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate ||
    0}deg); perspective: 1000px"
  class="h-[300px] w-[200px]"
>
  <div
    role="button"
    tabindex={0}
    class="card h-[300px] w-[200px]"
    class:rotate={flip}
    on:click={() => {
      clearTimeout(timeout);
      flip = !flip;
      if (flip) {
        timeout = setTimeout(() => {
          flip = false;
        }, 4000);
      }
    }}
    on:mouseenter={(e) => {
      calculateAngle(e);
    }}
    on:mousemove={(e) => {
      calculateAngle(e);
    }}
    on:mouseleave={() => {
      cssVarStyles = `transform: rotateX(0deg) rotateY(0deg)`;
    }}
  >
    <span class="inner-card" style={cssVarStyles}>
      <div class="relative">
        {#if item.image === 'sun'}
          <img alt="" src={sun} draggable="false" class="drop-shadow-sm" />
        {:else}
          <img alt="" src={moon} draggable="false" class="drop-shadow-sm" />
        {/if}
      </div>
    </span>
    <span class="inner-card-backface">
      <div class="relative">
        {#if item.text && item.text.length > 0}
          <p
            class="absolute left-6 top-6 z-10 max-w-[154px] text-left text-xl font-semibold text-[#171717]"
          >
            {item.text[Math.floor(Math.random() * item.text.length)].text}
          </p>
        {/if}
        <img alt="" src={back} class="drop-shadow-sm" />
      </div>
    </span>
  </div>
</div>

<style>
  .rotate {
    transform: rotateY(180deg);
  }
  .card {
    transform-style: preserve-3d;
    transition: all 0.8s ease-out;
  }
  .inner-card,
  .inner-card-backface {
    transition: all 0.4s ease-out;
    transform: rotateX(0deg) rotateY(0deg);
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .inner-card-backface {
    transform: rotateY(180deg);
  }
</style>
