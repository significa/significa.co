<script lang="ts">
  import { spring } from 'svelte/motion';
  import img1 from '../../../assets/get-a-quote-1.png';
  import img2 from '../../../assets/get-a-quote-2.png';
  import img3 from '../../../assets/get-a-quote-3.png';
  import img4 from '../../../assets/get-a-quote-4.png';
  import { writable } from 'svelte/store';

  const images = [img1, img2, img3, img4];

  let el: HTMLDivElement;
  const y = writable(0);
  const eased = spring(0, {
    stiffness: 0.1,
    damping: 0.4
  });
  $: eased.set($y);
</script>

<svelte:window bind:scrollY={$y} />

<div bind:this={el} class="flex justify-center overflow-hidden border-b py-12 md:py-20 lg:py-32">
  <div class="flex gap-10" style="transform: translateX(calc({$eased / 5}px * -1 + 15vw))">
    {#each images as img}
      <img class="max-h-96" alt="" src={img} />
    {/each}
  </div>
</div>
