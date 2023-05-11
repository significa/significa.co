<script lang="ts">
  import type { CanvasTarotStoryblok } from '$types/bloks';
  export let item: CanvasTarotStoryblok;
  import back from '$assets/back.svg';
  import sun from '$assets/sun.svg';
  import moon from '$assets/moon.svg';
  let flip = false;
  let timeout: ReturnType<typeof setTimeout>;
  let calculateAngle = function (e, item) {
    // Get the x position of the users mouse, relative to the card itself
    let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
    // Get the y position relative to the button
    let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

    // Calculate half the width and height
    let halfWidth = item.getBoundingClientRect().width / 2;
    let halfHeight = item.getBoundingClientRect().height / 2;

    let calcAngleX = (x - halfWidth) / 14;
    let calcAngleY = (y - halfHeight) / 14;

    // And set its container's perspective.
    item.style.perspective = `${halfWidth * 6}px`;

    // Set the items transform CSS property
    item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg)`;
  };

  let frontcard = document.querySelector('.flip-card-front');
  let backcard = document.querySelector('.flip-card-back');
  let parent = document.querySelector('.flip-card-inner');

  $: if (flip) {
    parent?.addEventListener('mouseenter', function (e) {
      calculateAngle(e, backcard);
    });

    parent?.addEventListener('mousemove', function (e) {
      calculateAngle(e, backcard);
    });

    parent?.addEventListener('mouseleave', function () {
      // frontcard.style.transform = 'rotateY(0deg) rotateX(0deg)';
      backcard.style.transform = 'rotateY(180deg) rotateX(0deg)';
    });
  } else {
    parent?.addEventListener('mouseenter', function (e) {
      calculateAngle(e, frontcard);
    });

    parent?.addEventListener('mousemove', function (e) {
      calculateAngle(e, frontcard);
    });

    parent?.addEventListener('mouseleave', function () {
      frontcard.style.transform = 'rotateY(0deg) rotateX(0deg)';
      // backcard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="h-[300px] w-[200px]"
  style="perspective: 1000px;"
  on:click={() => {
    clearTimeout(timeout);
    flip = !flip;
    // if (flip) {
    //   timeout = setTimeout(() => {
    //     flip = false;
    //   }, 4000);
    // }
  }}
>
  <div
    class="test"
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
</style>
