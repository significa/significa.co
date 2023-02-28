<script lang="ts">
  import type { VideoStoryblok } from '$types/bloks';

  export let block: VideoStoryblok;
</script>

{#if block.video?.filename}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    muted
    src={block.video.filename}
    controls={block.controls}
    loop={block.loop}
    autoplay={block.autoplay}
  />
{/if}

<style lang="postcss">
  video {
    width: 100%;
    height: auto;

    border-radius: var(--border-radius-lg);
  }
</style>
