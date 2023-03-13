<script context="module" lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { writable } from 'svelte/store';
  import { fade, scale } from 'svelte/transition';

  let active = writable(0);
  export const items = writable<AssetStoryblok[]>([]);

  export const open = (images: AssetStoryblok[]) => {
    items.set(images);
  };

  export const close = () => {
    active.set(0);
    items.set([]);
  };
</script>

<script lang="ts">
  import { CircleButton } from '@significa/svelte-ui';
  import { bodyLock } from '$lib/actions/body-lock';

  const prev = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    active.update((value) => (value === 0 ? $items.length - 1 : value - 1));
  };

  const next = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    active.update((value) => (value === $items.length - 1 ? 0 : value + 1));
  };

  const onkeydown = (e: KeyboardEvent) => {
    if ($items.length === 0) return;

    if (e.key === 'Escape') close();

    if ($items.length > 1 && e.key === 'ArrowLeft') prev(e);

    if ($items.length > 1 && e.key === 'ArrowRight') next(e);
  };
</script>

<svelte:window on:keydown={onkeydown} />

{#if $items.length}
  <div
    use:bodyLock
    class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.8)]"
    transition:fade={{ duration: 200 }}
    on:click={close}
    on:keydown={onkeydown}
  >
    <CircleButton
      class="absolute top-2 right-2 z-10 bg-black text-white"
      on:click={close}
      icon="close"
    />
    {#if $items.length > 1}
      <CircleButton
        class="absolute top-1/2 left-2 z-10 -translate-y-1/2 rotate-180 bg-black text-white"
        on:click={prev}
        icon="chevron-right"
      />
      <CircleButton
        class="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black text-white"
        on:click={next}
        icon="chevron-right"
      />
    {/if}
    {#each [$items[$active]] as image ($active)}
      {@const { src, alt, width, height, title } = getImageAttributes(image)}
      <figure
        class="absolute h-[calc(100%-32px)] w-[calc(100%-32px)]"
        transition:scale={{ start: 0.9, duration: 200 }}
      >
        <img class="h-full w-full object-contain" {src} {alt} {width} {height} />
        {#if title}
          <figcaption
            class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-2xs bg-[rgba(0,0,0,0.8)] p-1 text-xs text-white"
          >
            {title}
          </figcaption>
        {/if}
      </figure>
    {/each}
  </div>
{/if}
