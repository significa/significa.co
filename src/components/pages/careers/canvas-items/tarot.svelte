<script lang="ts">
  import type { CanvasTarotStoryblok } from '$types/bloks';
  export let item: CanvasTarotStoryblok;
  import back from '$assets/back.svg';
  import sun from '$assets/sun.svg';
  import moon from '$assets/moon.svg';
  let flip = false;
  let timeout: ReturnType<typeof setTimeout>;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="h-[300px] w-[200px]"
  style="perspective: 1000px;"
  on:click={() => {
    clearTimeout(timeout);
    flip = !flip;
    if (flip) {
      timeout = setTimeout(() => {
        flip = false;
      }, 4000);
    }
  }}
>
  <div
    style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate ||
      0}deg)"
  >
    <div class="flip-card-inner relative h-full w-full" class:rotate={flip}>
      <div class="flip-card-front">
        {#if item.image === 'sun'}
          <img alt="" src={sun} draggable="false" class="drop-shadow-sm" />
        {:else}
          <img alt="" src={moon} draggable="false" class="drop-shadow-sm" />
        {/if}
      </div>
      <div class="flip-card-back">
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
      </div>
    </div>
  </div>
</div>

<style>
  .flip-card-inner {
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .rotate {
    transform: rotateY(180deg);
  }
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
  .flip-card-inner:hover .flip-card-front {
    animation: wiggle 1000ms 1 ease-in-out;
  }
  @-webkit-keyframes wiggle {
    0% {
      -webkit-transform: rotate(2deg);
    }
    25% {
      -webkit-transform: rotate(-2deg);
    }
    50% {
      -webkit-transform: rotate(4deg);
    }
    75% {
      -webkit-transform: rotate(-1deg);
    }
    100% {
      -webkit-transform: rotate(0deg);
    }
  }

  @keyframes wiggle {
    0% {
      transform: rotate(2deg);
    }
    25% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(4deg);
    }
    75% {
      transform: rotate(-1deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
