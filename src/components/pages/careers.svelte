<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { device } from '$lib/stores/device';
  import type { CareersPageStoryblok } from '$types/bloks';
  import Canvas from './careers/canvas.svelte';
  import { Button } from '@significa/svelte-ui';
  import { bodyLock } from '@significa/svelte-ui/actions';
  import { fade } from 'svelte/transition';

  export let page: CareersPageStoryblok;

  let canvasFullscreen: boolean;
</script>

<Seo />
<main>
  <section class="relative mx-auto">
    <Canvas
      withMouseDragScroll
      title={page.page_title}
      height={page.canvas_height}
      width={page.canvas_width}
      items={page.canvas_items}
      style="height: min({page.canvas_height}px ,calc(100vh - 76px));"
    />

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
</main>

{#if $device === 'touch' && canvasFullscreen}
  <div use:bodyLock class="fixed inset-0 z-50 bg-black/50" transition:fade={{ duration: 200 }}>
    <div class="absolute inset-2 overflow-hidden rounded-md bg-background shadow-xl lg:inset-4">
      <Canvas
        title={page.page_title}
        height={page.canvas_height}
        width={page.canvas_width}
        items={page.canvas_items}
        class="h-[100%]"
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
