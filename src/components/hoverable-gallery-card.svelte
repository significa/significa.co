<script context="module" lang="ts">
  export type TransformOptions = { x: string; y: string; z: number; deg: number };
</script>

<script lang="ts">
  import SplitLines from '$components/split-lines.svelte';
  import Bird from './illustrations/stickers/bird.svelte';
  import { getImageAttributes } from '$lib/utils/cms';

  import type { NotepadCardStoryblok, PhotoCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { debounced } from '$lib/stores/debounced';
  import { writable } from 'svelte/store';

  export let card: NotepadCardStoryblok | PhotoCardStoryblok;
  export let staticTransformState: TransformOptions;
  export let hoverTransformState: TransformOptions;

  let hovered = writable(false);
  let debouncedHover = debounced(hovered, 200);
  $: transformState = $debouncedHover ? hoverTransformState : staticTransformState;
</script>

{#if card.component === 'photo_card' && card.photo?.filename}
  {@const { alt, src } = getImageAttributes(card.photo)}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class={clsx(
      '-mx-[10%] aspect-[4/6] bg-white p-[4%] shadow-md transition-all duration-[250ms]',
      $$restProps.class
    )}
    style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z}`}
    on:mouseenter={() => {
      hovered.set(true);
    }}
    on:mouseleave={() => {
      hovered.set(false);
    }}
  >
    <img class="aspect-[4/6] h-[100%] object-cover" {src} {alt} />
  </div>
{:else if card.component === 'notepad_card' && card.text}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class={clsx(
      'aspect-[4/6] transition-all duration-[250ms] lg:-mx-[10%] lg:p-[4%]',
      $$restProps.class
    )}
    style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z} `}
    on:mouseenter={() => {
      hovered.set(true);
    }}
    on:mouseleave={() => {
      hovered.set(false);
    }}
  >
    <div class="h-full rounded-xs bg-background-panel text-base/[2rem] shadow-md lg:text-notebook">
      <div class="mb-[3em] grid h-[10px] grid-cols-12 gap-[4%] p-4 lg:p-[1em]">
        {#each [...Array(12)] as _}
          <div class="aspect-square rounded-full bg-background shadow-inner" />
        {/each}
      </div>

      <div
        class="mt-[2em] flex h-full flex-col justify-between"
        style="background-image: linear-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 2em 2em"
      >
        <div class="-mt-[2em] px-4 lg:px-[1em]">
          <SplitLines text={card.text} class="relative font-comic font-bold" />
        </div>

        <div class="relative mb-12 flex h-1/2 justify-end">
          <Bird class="relative mr-6 block w-1/2 drop-shadow-md" />
        </div>
      </div>
    </div>
  </div>
{/if}
