<script lang="ts">
  import { track, type TrackingEventProps } from '$lib/track';
  import { Button } from '@significa/svelte-ui';
  import { fade } from 'svelte/transition';

  let video: HTMLVideoElement;
  let paused = true;
  let hasPlayedOnSession = false;

  export let src: string;
  export let play_label: string | undefined;
  export let trackEvent: TrackingEventProps | undefined = undefined;
</script>

<section class="relative mt-8 overflow-hidden rounded-md" data-theme="dark">
  {#if paused && play_label}
    <div
      transition:fade|local={{ duration: 200 }}
      class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-background/50"
    >
      <Button
        class="ring-foreground/20"
        on:click={() => {
          video.play();
          if (trackEvent && !hasPlayedOnSession) {
            track(trackEvent.event, trackEvent.options);
            hasPlayedOnSession = true;
          }
        }}
        icon="play">{play_label}</Button
      >
    </div>
  {/if}
  <video
    on:click={() => {
      if (!paused) {
        video.pause();
      }
    }}
    bind:this={video}
    class="aspect-video h-auto w-full bg-background-offset"
    muted={false}
    playsinline
    {src}
    bind:paused
  />
</section>
