<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { Icon } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ expand: AssetStoryblok }>();

  export let image: AssetStoryblok;
  export let enabled: boolean;
</script>

{#if image}
  {@const { src, alt, width, height } = getImageAttributes(image)}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    class={clsx('expandable-image', { enabled })}
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
      <div class="icon-holder">
        <Icon icon="expand" />
      </div>
    {/if}
    <img {src} {alt} {width} {height} />
  </div>
{/if}

<style lang="postcss">
  img {
    width: 100%;
    height: auto;
  }

  .expandable-image {
    width: 100%;
    position: relative;
    border-radius: var(--border-radius-md);
    overflow: hidden;

    &.enabled {
      cursor: zoom-in;

      & .icon-holder {
        position: absolute;
        z-index: 2;
        top: 8px;
        right: 8px;

        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--border-radius-full);
        background-color: black;
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;

        @media (hover: hover) {
          opacity: 0;
          transition: opacity var(--transition-appearance);
        }
      }

      outline: none;
      transition: box-shadow var(--transition-appearance);
      &:focus-visible {
        box-shadow: 0 0 0 var(--outline-width) var(--color-outline);

        & .icon-holder {
          opacity: 1;
        }
      }

      @media (hover: hover) {
        &:hover .icon-holder {
          opacity: 1;
        }
      }
    }
  }

  .icon-holder {
    display: none;
  }
</style>
