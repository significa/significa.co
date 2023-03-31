<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { VideoStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: VideoStoryblok;
</script>

{#if block.video?.filename}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    class={clsx('not-rich-text my-6 h-auto w-full rounded-lg md:my-10', $$restProps.class)}
    use:storyblokEditable={block}
    muted
    src={block.video.filename}
    controls={block.controls}
    loop={block.loop}
    autoplay={block.autoplay}
    playsinline
  />
{/if}
