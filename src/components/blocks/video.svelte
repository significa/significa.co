<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { VideoStoryblok } from '$types/bloks';

  export let block: VideoStoryblok;
</script>

{#if block.video?.filename}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    class="w-full h-auto rounded-lg"
    use:storyblokEditable={block}
    muted
    src={block.video.filename}
    controls={block.controls}
    loop={block.loop}
    autoplay={block.autoplay}
  />
{/if}
