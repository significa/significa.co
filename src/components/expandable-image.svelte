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

{#if image}
  {@const { src, alt, width, height } = getImageAttributes(image)}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class={clsx(
      'w-full rounded-md overflow-hidden',
      enabled && 'group relative outline-none focus-visible:ring-4 transition-all',
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
        class="absolute z-10 top-2 right-2 bg-black text-white hidden group-hover:flex group-focus-visible:flex"
        icon="expand"
      />
    {/if}
    <img class="w-full h-auto" {src} {alt} {width} {height} />
  </div>
{/if}
