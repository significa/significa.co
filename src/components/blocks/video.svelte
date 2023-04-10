<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { VideoStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: VideoStoryblok;
</script>

{#if block.video?.filename}
  <!-- svelte-ignore a11y-media-has-caption -->
  <figure
    class={clsx('not-rich-text my-6 h-auto w-full md:my-10', $$restProps.class)}
    use:storyblokEditable={block}
  >
    <video
      class="rounded-lg"
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
