<script context="module" lang="ts">
  export type TransformOptions = { x: string; y: string; z: number; deg: number };
</script>

<script lang="ts">
  import SplitLines from '$components/split-lines.svelte';
  import { getImageAttributes } from '$lib/utils/cms';

  import type { NotepadCardStoryblok, PhotoCardStoryblok } from '$types/bloks';

  export let card: NotepadCardStoryblok | PhotoCardStoryblok;
  export let staticTransformState: TransformOptions;
  export let hoverTransformState: TransformOptions;

  let transformState = staticTransformState;

  const files = import.meta.glob('../get-a-quote/eggs/excited.svg', { as: 'raw', eager: true });
  const egg = Object.entries(files)[0][1];
</script>

{#if card.component === 'photo_card' && card.photo?.filename}
  {@const { alt, src } = getImageAttributes(card.photo)}
  <div
    class="-mx-[10%] bg-white p-[4%] shadow-md transition-all duration-[250ms]"
    style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z}`}
    on:mouseenter={() => {
      transformState = hoverTransformState;
    }}
    on:mouseleave={() => {
      transformState = staticTransformState;
    }}
  >
    <img class="aspect-[3/4] h-[100%] object-cover" {src} {alt} />
  </div>
{:else if card.component === 'notepad_card' && card.text}
  <div
    class="-mx-[10%] transition-all duration-[250ms]"
    style={`transform:translate(${transformState.x}, ${transformState.y}) rotate(${transformState.deg}deg); z-index: ${transformState.z} `}
    on:mouseenter={() => {
      transformState = hoverTransformState;
    }}
    on:mouseleave={() => {
      transformState = staticTransformState;
    }}
  >
    <div class="aspect-[3/4] rounded-xs bg-background-panel p-4 shadow-md">
      <div class="mb-3 grid h-[10px] grid-cols-12 gap-[4%]">
        {#each [...Array(12)] as _}
          <div class="aspect-square rounded-full bg-background shadow-inner" />
        {/each}
      </div>

      <div class="mt-7 flex h-[100%] flex-col justify-between">
        <div>
          <SplitLines
            text={card.text}
            class="relative font-comic font-bold leading-8 after:absolute after:bottom-1 after:left-0 after:right-0 after:-mx-4 after:h-[1px] after:bg-background-offset"
          />
        </div>

        <div class="relative flex h-[40%] justify-end [&>svg]:h-[100%] [&>svg]:w-fit">
          {@html egg}
        </div>
      </div>
    </div>
  </div>
{/if}
