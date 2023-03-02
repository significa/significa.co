<script context="module" lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { Icon } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { writable } from 'svelte/store';
  import { fade, scale } from 'svelte/transition';

  let active = writable(0);
  const items = writable<AssetStoryblok[]>([]);

  export const open = (images: AssetStoryblok[]) => {
    items.set(images);
  };

  export const close = () => {
    active.set(0);
    items.set([]);
  };
</script>

<script lang="ts">
  const prev = () => {
    active.update((value) => (value === 0 ? $items.length - 1 : value - 1));
  };

  const next = () => {
    active.update((value) => (value === $items.length - 1 ? 0 : value + 1));
  };

  const onkeydown = (e: KeyboardEvent) => {
    if ($items.length === 0) return;

    if (e.key === 'Escape') close();

    if ($items.length > 1 && e.key === 'ArrowLeft') prev();

    if ($items.length > 1 && e.key === 'ArrowRight') next();
  };

  const buttonClasses =
    'absolute z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center';
</script>

<svelte:window on:keydown={onkeydown} />

{#if $items.length}
  <div
    class="fixed z-50 inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
    transition:fade={{ duration: 200 }}
    on:click={close}
    on:keydown={onkeydown}
  >
    <button class={clsx(buttonClasses, 'top-2 right-2')} on:click={close}>
      <Icon icon="close" />
    </button>
    {#if $items.length > 1}
      <button
        class={clsx(buttonClasses, 'top-1/2 -translate-y-1/2 left-2 rotate-180')}
        on:click|stopPropagation={prev}><Icon icon="chevron" /></button
      >
      <button
        class={clsx(buttonClasses, 'top-1/2 -translate-y-1/2 right-2')}
        on:click|stopPropagation={next}><Icon icon="chevron" /></button
      >
    {/if}
    {#each [$items[$active]] as image ($active)}
      {@const { src, alt, width, height, title } = getImageAttributes(image)}
      <figure
        class="absolute w-[calc(100%-32px)] h-[calc(100%-32px)]"
        transition:scale={{ start: 0.9, duration: 200 }}
      >
        <img class="w-full h-full object-contain" {src} {alt} {width} {height} />
        {#if title}
          <figcaption
            class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.8)] p-1 rounded-2xs text-white text-xs"
          >
            {title}
          </figcaption>
        {/if}
      </figure>
    {/each}
  </div>
{/if}
