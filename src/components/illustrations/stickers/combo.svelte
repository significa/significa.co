<script lang="ts">
  import BalloonRectangle from './balloon-rectangle.svelte';
  import BalloonRound from './balloon-round.svelte';
  import FriedEgg from './fried-egg.svelte';
  import People from './people.svelte';

  export let variant: 'one' | 'two' = 'one';
</script>

{#if variant === 'one'}
  <div class="relative h-[186px] w-[380px]">
    <BalloonRound class="absolute left-4 drop-shadow-md" />
    <BalloonRectangle class="absolute bottom-0 right-4 drop-shadow-md" />
  </div>
{:else}
  <div class="relative h-[186px] w-[240px]">
    <People class="absolute left-5 drop-shadow-md" />
    <FriedEgg class="absolute bottom-0 right-5 drop-shadow-md" />
  </div>
{/if}
