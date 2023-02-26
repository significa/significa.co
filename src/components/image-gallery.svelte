<script context="module" lang="ts">
  import type { ImageAttributes } from '$lib/utils/cms';
  import { writable } from 'svelte/store';

  const items = writable<ImageAttributes[]>([]);

  export const open = (images: ImageAttributes[]) => {
    items.set(images);
  };

  export const close = () => {
    items.set([]);
  };
</script>

<svelte:window
  on:keydown={(event) => {
    if ($items.length > 0 && event.key === 'Escape') {
      close();
    }
  }}
/>

{#if $items.length}
  <div>
    <button on:click={close}>close</button>
    {#each $items as { src, alt, width, height, title }}
      <figure>
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
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
