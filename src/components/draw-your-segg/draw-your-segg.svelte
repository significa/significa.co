<script lang="ts">
  import Canvas from './canvas.svelte';
  import leftImage from './assets/left.svg';

  const width = 600;
  const height = 700;
</script>

<div class="flex drop-shadow-lg">
  <div
    class="relative flex items-center justify-center rounded-lg bg-white bg-gradient-to-l from-black/5 to-transparent to-30%"
    style="width:{width}px;height:{height}px;"
  >
    <img src={leftImage} alt="Draw your segg" />
    <div class="dots" />
  </div>
  <div class="relative overflow-hidden rounded-lg">
    <Canvas {width} {height} />
    <div class="dots" />
  </div>
</div>

<style>
  .dots {
    pointer-events: none;
    position: absolute;
    inset: 16px;

    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
  }
</style>
