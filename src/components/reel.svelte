<script lang="ts">
  import { device } from '$lib/stores/device';
  import { Button } from '@significa/svelte-ui';
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  let video: HTMLVideoElement;
  let paused = true;
  export let src: string;
  export let preview: string | undefined = undefined;

  export let playLabel: string | undefined;
  export let buttonTheme: 'light' | 'dark' | '' = 'light';

  let x = 0;
  let y = 0;
  let showButton = false;

  onMount(() => {
    x = video.clientWidth / 2;
    y = video.clientHeight / 2;

    showButton = true;
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
  class="relative overflow-hidden rounded-lg"
  on:mousemove={(e) => {
    if ($device === 'touch') return;

    x = e.clientX - video.getBoundingClientRect().left;
    y = e.clientY - video.getBoundingClientRect().top;
  }}
  on:mouseenter={() => {
    if ($device === 'pointer') {
      showButton = true;
    }
  }}
  on:mouseleave={() => {
    if ($device === 'pointer') {
      showButton = false;
    }
  }}
>
  {#if showButton && paused && playLabel}
    <div
      data-theme={buttonTheme === 'light' ? 'dark' : 'light'}
      transition:scale={{ duration: 200 }}
      class="absolute z-20 origin-top-left bg-transparent"
      style="left: {x}px; top: {y}px"
    >
      <Button
        class="-translate-x-1/2 -translate-y-1/2 cursor-none ring-foreground/20"
        on:click={() => {
          video.play();
        }}
        icon="play">{playLabel}</Button
      >
    </div>
  {/if}
  {#if paused && playLabel}
    <div
      transition:fade={{ duration: 200 }}
      class="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/10"
    />
  {/if}
  <video
    poster={preview}
    bind:this={video}
    class="aspect-video h-auto w-full bg-background-offset [&[poster]]:h-full [&[poster]]:w-full [&[poster]]:bg-background [&[poster]]:object-cover"
    muted={false}
    playsinline
    bind:paused
    on:click={() => {
      if (!paused) {
        video.pause();
      } else {
        video.play();
      }
    }}
  >
    <source type="video/mp4" {src} />
  </video>
</section>
