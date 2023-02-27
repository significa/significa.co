<script context="module" lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { Icon } from '@significa/svelte-ui';
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
</script>

<svelte:window on:keydown={onkeydown} />

{#if $items.length}
  <div transition:fade={{ duration: 200 }} on:click={close} on:keydown={onkeydown}>
    <button class="close" on:click={close}>
      <Icon icon="close" />
    </button>
    {#if $items.length > 1}
      <button class="previous" on:click|stopPropagation={prev}><Icon icon="chevron" /></button>
      <button class="next" on:click|stopPropagation={next}><Icon icon="chevron" /></button>
    {/if}
    {#each [$items[$active]] as image ($active)}
      {@const { src, alt, width, height, title } = getImageAttributes(image)}
      <figure transition:scale={{ start: 0.9, duration: 200 }}>
        <img {src} {alt} {width} {height} />
        {#if title}
          <figcaption>{title}</figcaption>
        {/if}
      </figure>
    {/each}
  </div>
{/if}

<style lang="postcss">
  div {
    position: fixed;
    z-index: var(--z-index-max);
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  figure {
    position: absolute;
    width: calc(100% - 32px);
    height: calc(100% - 32px);

    & img {
      width: 100%;
      height: 100%;

      object-fit: contain;
    }

    & figcaption {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      padding: 4px;
      border-radius: var(--border-radius-2xs);
      color: white;
      font-size: var(--font-size-xs);
    }
  }

  button {
    all: unset;
    cursor: pointer;

    position: absolute;
    z-index: 1;

    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--border-radius-full);
    background-color: black;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close {
    top: 10px;
    right: 10px;
  }

  .previous {
    top: 50%;
    left: 10px;
    transform: translateY(-50%) rotate(180deg);
  }

  .next {
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
</style>
