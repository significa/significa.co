<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { CanvasStoryblok } from '$types/bloks';
  import Canvas from '../pages/careers/canvas.svelte';
  import { device } from '$lib/stores/device';
  import { Button } from '@significa/svelte-ui';
  import { bodyLock } from '@significa/svelte-ui/actions';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';

  export let block: CanvasStoryblok;

  let canvasFullscreen: boolean;
</script>

<section use:storyblokEditable={block} class="relative mx-auto overflow-hidden">
  <Canvas
    withMouseDragScroll
    title={block.page_title}
    height={Number(block.canvas_height)}
    width={Number(block.canvas_width)}
    items={block.canvas_items}
    hideMap={$device === 'touch'}
    teamMembers={$page.data.teamMembers}
    style="height: min({block.canvas_height}px, calc(90vh - var(--topnav-height)));"
  />
  <div class="absolute left-0 right-0 top-0 h-16 border-t" />

  {#if $device === 'touch'}
    <Button
      on:click={() => {
        canvasFullscreen = true;
      }}
      variant="secondary"
      size="lg"
      icon="expand"
      class="absolute bottom-4 right-4 bg-background"
    />
  {/if}
</section>

{#if $device === 'touch' && canvasFullscreen}
  <div
    use:bodyLock
    class="fixed inset-0 z-50 bg-black/50"
    transition:fade|global={{ duration: 200 }}
  >
    <div class="absolute inset-2 overflow-hidden rounded-md bg-background shadow-xl lg:inset-4">
      <Canvas
        title={block.page_title}
        height={Number(block.canvas_height)}
        width={Number(block.canvas_width)}
        items={block.canvas_items}
        teamMembers={$page.data.teamMembers}
        class="h-full"
      />

      <Button
        on:click={() => {
          canvasFullscreen = false;
        }}
        variant="secondary"
        size="lg"
        icon="close"
        class="absolute right-4 top-4 bg-background"
      />
    </div>
  </div>
{/if}
