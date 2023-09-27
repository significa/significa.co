<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { VideoStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: VideoStoryblok;
</script>

{#if block.video?.filename}
  <figure
    class={clsx('not-rich-text my-8 h-auto w-full md:my-14', $$restProps.class)}
    use:storyblokEditable={block}
  >
    <video
      class="m-auto rounded-lg bg-background"
      muted
      src={block.video.filename}
      controls={block.controls}
      loop={block.loop}
      autoplay={block.autoplay}
      playsinline
    />
    {#if block?.video?.title}
      <figcaption class="mt-2 text-center text-sm text-foreground-secondary">
        {block.video.title}
      </figcaption>
    {/if}
  </figure>
{/if}
