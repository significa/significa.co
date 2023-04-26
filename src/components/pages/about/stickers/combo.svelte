<script>
  import BalloonRectangle from './balloon-rectangle.svelte';
  import BalloonRound from './balloon-round.svelte';
</script>

<div class="relative h-[186px] w-[380px]">
  <BalloonRound class="absolute left-4 drop-shadow-md" />
  <BalloonRectangle class="absolute bottom-0 right-4 drop-shadow-md" />
</div>
