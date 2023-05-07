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
<div class="flip-card" on:click={() => (flip = !flip)}>
  <div class="flip-card-inner" class:rotate={flip}>
    <div class="flip-card-front">
      <img alt="" src={asset} class="drop-shadow-sm" />
    </div>
    <div class="flip-card-back">
      <div class="relative">
        <p class="absolute left-3 top-6 z-10 text-left text-xl font-semibold text-[#171717]">
          {text}
        </p>
        <img alt="" src={back} class="drop-shadow-sm" />
      </div>
    </div>
  </div>
</div>

<style>
  .flip-card {
    background-color: transparent;
    width: 200px;
    height: 300px;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  /* Do an horizontal flip when you move the mouse over the flip box container */
  .rotate {
    transform: rotateY(180deg);
  }

  /* Position the front and back side */
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  /* Style the back side */
  .flip-card-back {
    transform: rotateY(180deg);
  }
</style>
