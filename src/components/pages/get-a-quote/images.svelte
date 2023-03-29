<script lang="ts">
  import { onMount } from 'svelte';
  import img1 from '../../../assets/get-a-quote-1.png';
  import img2 from '../../../assets/get-a-quote-2.png';
  import img3 from '../../../assets/get-a-quote-3.png';
  import img4 from '../../../assets/get-a-quote-4.png';

  const images = [img1, img2, img3, img4];

  let y = 0;
  let eased = 0;

  const ease = () => {
    eased = eased + (y - eased) * 0.075;
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

<div class="flex justify-center overflow-hidden border-b py-12 md:py-20 lg:py-32">
  <div class="flex gap-10" style="transform: translateX(calc({eased / 5}px * -1 + 15vw))">
    {#each images as img}
      <img class="max-h-96" alt="" src={img} />
    {/each}
  </div>
</div>
