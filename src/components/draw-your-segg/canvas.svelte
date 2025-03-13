<script lang="ts">
  import { tools } from './config';
  import { createEventDispatcher, onMount } from 'svelte';
  import { simplify, renderDrawing, draw } from './canvas-rendering';
  import Tools from './tools.svelte';
  import saveImage from './assets/save.svg';
  import undoImage from './assets/undo.svg';
  import redoImage from './assets/redo.svg';
  import linkImage from './assets/link.svg';
  import clsx from 'clsx';
  import { writable, type Writable } from 'svelte/store';
  import { debounced } from '$lib/stores/debounced';
  import type { Point, Tool, Stroke, DrawingContent } from './types';
  import { page } from '$app/stores';
  import { toast } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';

  // 2x scale for a higher resolution render ("High DPI displays")
  const CANVAS_SCALE = 2;

  export let drawingId: string | null;
  export let width: number;
  export let height: number;
  export let templateStrokes: Stroke[];

  const dispatch = createEventDispatcher<{ change: DrawingContent }>();

  let started = false;

  let canvas: HTMLCanvasElement;

  let strokes: Writable<Stroke[]> = writable(templateStrokes);

  let currentStrokePath: Point[] = [];
  let currentTool: Tool = tools.pencil;
  let currentDrawingContent: DrawingContent = {
    canvas_width: width,
    canvas_height: height,
    strokes: $strokes
  };

  $: currentDrawingContent = {
    canvas_width: width,
    canvas_height: height,
    strokes: $strokes
  };

  $: renderDrawing(canvas, currentDrawingContent, 1);

  let debouncedStrokes = debounced(strokes, 2000);

  $: if ($debouncedStrokes && started) {
    dispatch('change', currentDrawingContent);
  }

  let isDrawing = false;
  let undone: Stroke[] = [];

  $: canUndo = $strokes.length > templateStrokes.length;
  $: canRedo = !!undone.length;

  $: undoActions = [
    ['undo', undo, canUndo, undoImage],
    ['redo', redo, canRedo, redoImage]
  ] as const;

  function undo() {
    if (!canUndo) return;

    undone = [...undone, $strokes[$strokes.length - 1]];
    strokes.update((prev) => prev.slice(0, -1));
  }

  function redo() {
    if (!canRedo) return;

    strokes.update((prev) => [...prev, undone[undone.length - 1]]);
    undone = undone.slice(0, -1);
  }

  function onStart() {
    started = true;
    isDrawing = true;

    const ctx = canvas?.getContext('2d', { alpha: false });
    ctx?.save();
    ctx?.beginPath();
  }

  function onMove(e: { clientX: number; clientY: number }) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const scale = width / rect.width; // canvas can be scaled down on mobile
    const x = (e.clientX - canvas.getBoundingClientRect().left) * scale;
    const y = (e.clientY - canvas.getBoundingClientRect().top) * scale;

    // reset "redo"
    undone = [];

    currentStrokePath = [...currentStrokePath, [x, y]];

    // draw the entire drawing
    renderDrawing(canvas, currentDrawingContent, 1);

    // plus the current stroke
    draw(
      canvas,
      {
        color: currentTool.color,
        width: currentTool.width,
        path: currentStrokePath
      },
      1
    );
  }

  function onEnd() {
    isDrawing = false;

    // commit the current stroke to the drawing
    if (currentStrokePath.length) {
      strokes.update((prev) => [
        ...prev,
        {
          color: currentTool.color,
          width: currentTool.width,
          path: simplify(currentStrokePath, 2)
        }
      ]);
    }

    // reset the points
    currentStrokePath = [];
  }

  onMount(() => {
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx?.scale(CANVAS_SCALE, CANVAS_SCALE);
  });
</script>

<div data-theme="light" class="relative select-none overflow-hidden">
  <canvas
    width={width * CANVAS_SCALE}
    height={height * CANVAS_SCALE}
    class="touch-none"
    style="width:min(calc(100vw - 32px),{width}px); aspect-ratio: 6/7; background:white; cursor: url({currentTool.cursor}) 5 {currentTool.width /
      2}, auto;"
    bind:this={canvas}
    on:touchstart={onStart}
    on:mousedown={onStart}
    on:touchend={onEnd}
    on:mouseup={onEnd}
    on:mouseleave={onEnd}
    on:mousemove={onMove}
    on:touchmove={(e) => onMove(e.touches[0])}
  />
  <div
    class={clsx(
      'transition-all duration-500 ease-motion',
      isDrawing && 'pointer-events-none translate-y-16'
    )}
  >
    <div
      class="absolute left-2 top-2 z-10 flex h-8 items-center justify-between rounded-sm border xs:bottom-2 xs:top-auto"
    >
      {#each undoActions as [alt, action, condition, image], i}
        {#if i > 0}
          <div class="h-8 border-r" />
        {/if}
        <button
          disabled={!condition}
          class={clsx(
            'flex h-8 w-8 items-center justify-center hover:bg-foreground/2 disabled:pointer-events-none disabled:opacity-50',
            i > 0 ? 'rounded-r-sm' : 'rounded-l-sm'
          )}
          on:click={action}
        >
          <img {alt} src={image} />
        </button>
      {/each}
    </div>

    <Tools bind:currentTool />

    <div class="absolute right-2 top-2 flex gap-2 xs:bottom-2 xs:top-auto">
      {#if drawingId}
        <button
          class="flex h-8 w-8 items-center justify-center rounded-sm border hover:bg-foreground/2"
          on:click={() => {
            navigator.clipboard.writeText($page.url.origin + `/segg/${drawingId}`);
            toast.success({
              message: t('draw-segg.clipboard.feedback')
            });
          }}
        >
          <img alt="copy link" src={linkImage} />
        </button>
      {/if}

      {#key $strokes}
        <a
          class="flex h-8 w-8 items-center justify-center rounded-sm border hover:bg-foreground/2"
          download="segg.png"
          href={canvas?.toDataURL('image/png')}><img alt="download" src={saveImage} /></a
        >
      {/key}
    </div>
  </div>
</div>
