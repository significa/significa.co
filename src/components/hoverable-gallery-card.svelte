<script context="module" lang="ts">
  export type TransformOptions = { x: string; y: string; z: number; deg: number };
</script>

<script lang="ts">
  import SplitLines from '$components/split-lines.svelte';
  import Bird from './illustrations/stickers/bird.svelte';
  import { getImageAttributes } from '$lib/utils/cms';

  import type { NotepadCardStoryblok, PhotoCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let card: NotepadCardStoryblok | PhotoCardStoryblok;
  export let staticTransformState: TransformOptions;
  export let hoverTransformState: TransformOptions;

  let transformState = staticTransformState;
</script>

{#if card.component === 'photo_card' && card.photo?.filename}
  {@const { alt, src } = getImageAttributes(card.photo)}
  <div
    class={clsx(
      '-mx-[10%] aspect-[4/6] bg-white p-[4%] shadow-md transition-all duration-[250ms]',
      $$restProps.class
    )}
    style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z}`}
    on:mouseenter={() => {
      transformState = hoverTransformState;
    }}
    on:mouseleave={() => {
      transformState = staticTransformState;
    }}
  >
    <img class="aspect-[4/6] h-[100%] object-cover" {src} {alt} />
  </div>
{:else if card.component === 'notepad_card' && card.text}
  <div
    class={clsx('-mx-[10%] transition-all duration-[250ms]', $$restProps.class)}
    style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z} `}
    on:mouseenter={() => {
      transformState = hoverTransformState;
    }}
    on:mouseleave={() => {
      transformState = staticTransformState;
    }}
  >
    <div class="aspect-[4/6] rounded-xs bg-background-panel shadow-md">
      <div class="mb-10 grid h-[10px] grid-cols-12 gap-[4%] p-4">
        {#each [...Array(12)] as _}
          <div class="aspect-square rounded-full bg-background shadow-inner" />
        {/each}
      </div>

      <div
        class="mt-7 flex h-[100%] flex-col justify-between"
        style="background-image: linear-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 2rem 2rem;"
      >
        <div class="-mt-[2rem] px-4">
          <SplitLines text={card.text} class="relative font-comic font-bold leading-8" />
        </div>

        <div class="relative mb-7 flex h-[50%] justify-end">
          <Bird class="relative mr-7 h-[100%] w-fit drop-shadow-md" />
        </div>
      </div>
    </div>
  </div>
{/if}
