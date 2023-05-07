<script>
  /**
   * @type {string}
   */
  export let text;
  /**
   * @type {any}
   */
  export let asset;
  let flip = false;
  import back from '$assets/back.svg';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="h-[300px] w-[200px]"
  style="perspective: 1000px;"
  on:click={() => {
    flip = !flip;
    setTimeout(() => {
      flip = false;
    }, 4000);
  }}
>
  <div class="rleative flip-card-inner h-full w-full" class:rotate={flip}>
    <div class="flip-card-front">
      <img alt="" src={asset} class="drop-shadow-sm" />
    </div>
    <div class="flip-card-back">
      <div class="relative">
        <p
          class="absolute left-6 top-6 z-10 max-w-[154px] text-left text-xl font-semibold text-[#171717]"
        >
          {text}
        </p>
        <img alt="" src={back} class="drop-shadow-sm" />
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
    -webkit-animation-name: wiggle;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: ease-in-out;
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
