<script lang="ts">
  import img1 from '../../../assets/get-a-quote-1.png';
  import img2 from '../../../assets/get-a-quote-2.png';
  import img3 from '../../../assets/get-a-quote-3.png';
  import img4 from '../../../assets/get-a-quote-4.png';

  const images = [img1, img2, img3, img4];

  let y: number;
</script>

<svelte:window bind:scrollY={y} />

<div class="mt-32 flex justify-center overflow-hidden border-b border-border pb-32">
  <div class="flex gap-10" style="transform: translateX({y / 10 - 200}px)">
    {#each images as img}
      <img class="h-80 w-auto" alt="" src={img} />
    {/each}
  </div>
</div>
