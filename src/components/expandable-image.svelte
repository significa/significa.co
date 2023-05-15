<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { CircleButton } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ expand: AssetStoryblok }>();

  let className: string | undefined = undefined;
  export { className as class };
  export let image: AssetStoryblok;
  export let enabled: boolean;
</script>

{#if image?.filename}
  {@const { src, alt, width, height } = getImageAttributes(image)}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class={clsx(
      'w-full overflow-hidden rounded-md',
      enabled && 'group relative outline-none transition-all focus-visible:ring-4',
      className
    )}
    role={enabled ? 'button' : undefined}
    tabindex={enabled ? 0 : undefined}
    on:click={() => {
      if (enabled) dispatch('expand', image);
    }}
    on:keydown={(e) => {
      if (enabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        dispatch('expand', image);
      }
    }}
  >
    {#if enabled}
      <CircleButton
        class="absolute right-2 top-2 z-10 hidden bg-black text-white group-hover:flex group-focus-visible:flex [@media(hover:none)]:flex"
        icon="expand"
      />
    {/if}
    <img class="h-auto w-full" {src} {alt} {width} {height} />
  </div>
{/if}
