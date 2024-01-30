<script lang="ts">
  import { colors, widths, cursors, tools } from './config';
  import { createEventDispatcher, onMount } from 'svelte';
  import { getMidBetween, simplify } from './utils';
  import Tools from './tools.svelte';
  import saveImage from './assets/save.svg';
  import undoImage from './assets/undo.svg';
  import redoImage from './assets/redo.svg';
  import linkImage from './assets/link.svg';
  import clsx from 'clsx';
  import { writable, type Writable } from 'svelte/store';
  import { debounced } from '$lib/stores/debounced';
  import type { Drawing, Point, Tool } from './types';
  import { page } from '$app/stores';
  import { toast } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';

  const dispatch = createEventDispatcher<{ change: Drawing }>();

  let started = false;

  let canvas: HTMLCanvasElement;
  export let width: number;
  export let height: number;

  export let id: string | null = null; // database ID
  export let template: Drawing = [];
  let drawing: Writable<Drawing> = writable(template);
  let points: Point[] = [];
  let tool: Tool = tools.pencil;

  let debouncedDrawing = debounced(drawing, 2000);
  $: if ($debouncedDrawing && started) {
    dispatch('change', $debouncedDrawing);
  }

  let isDrawing = false;
  let undone: Drawing = [];
  $: canUndo = $drawing.length > template.length;
  $: canRedo = !!undone.length;

  function undo() {
    if (!canUndo) return;

    undone = [...undone, $drawing[$drawing.length - 1]];
    drawing.update((prev) => prev.slice(0, -1));
  }

  function redo() {
    if (!canRedo) return;

    drawing.update((prev) => [...prev, undone[undone.length - 1]]);
    undone = undone.slice(0, -1);
  }

  function setCanvasTool(canvas: HTMLCanvasElement, tool: Tool) {
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = widths[tool.width];
    ctx.strokeStyle = colors[tool.color];
  }

  function draw(canvas: HTMLCanvasElement, points: Point[]) {
    const ctx = canvas?.getContext('2d', { alpha: false });

    ctx?.beginPath();

    for (let i = 0; i < points.length - 1; i++) {
      let p1 = points[i];
      let p2 = points[i + 1];

      const [midX, midY] = getMidBetween(p1, p2);
      ctx?.quadraticCurveTo(p1[0], p1[1], midX, midY);
    }

    ctx?.stroke();
  }

  function clear() {
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function renderFullDrawing(canvas: HTMLCanvasElement, drawing: Drawing) {
    clear();

    drawing.forEach((stroke) => {
      setCanvasTool(canvas, stroke);
      draw(canvas, stroke.points);
    });

    setCanvasTool(canvas, tool);
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
    const multiplier = width / rect.width; // canvas can be scaled down on mobile
    const x = (e.clientX - canvas.getBoundingClientRect().left) * multiplier;
    const y = (e.clientY - canvas.getBoundingClientRect().top) * multiplier;

    // reset "redo"
    undone = [];

    points = [...points, [x, y]];

    // draw the entire drawing
    renderFullDrawing(canvas, $drawing);

    // plus the current stroke
    draw(canvas, points);
  }

  function onEnd() {
    isDrawing = false;

    // commit the current stroke to the drawing
    if (points.length) {
      drawing.update((prev) => [...prev, { ...tool, points: simplify(points, 2) }]);
    }

    // reset the points
    points = [];
  }

  $: renderFullDrawing(canvas, $drawing);

  // set the canvas size (double for retina)
  onMount(() => {
    // Double the canvas size for retina
    canvas.width = width * 2;
    canvas.height = height * 2;

    // Scale the context to ensure correct drawing operations
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx?.scale(2, 2);
  });

  $: undoActions = [
    ['undo', undo, canUndo, undoImage],
    ['redo', redo, canRedo, redoImage]
  ] as const;
</script>

<div data-theme="light" class="relative select-none overflow-hidden">
  <canvas
    {width}
    {height}
    class="touch-none"
    style="width:min(calc(100vw - 32px),{width}px); aspect-ratio: 6/7; background:white; cursor: url({cursors.get(
      tool
    )}) 5 {widths[tool.width] / 2}, auto;"
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

    <Tools bind:tool />

    <div class="absolute right-2 top-2 flex gap-2 xs:bottom-2 xs:top-auto">
      {#if id}
        <button
          class="flex h-8 w-8 items-center justify-center rounded-sm border hover:bg-foreground/2"
          on:click={() => {
            navigator.clipboard.writeText($page.url.origin + `/segg/${id}`);
            toast.success({
              message: t('draw-segg.clipboard.feedback')
            });
          }}
        >
          <img alt="copy link" src={linkImage} />
        </button>
      {/if}
      {#key $drawing}
        <a
          class="flex h-8 w-8 items-center justify-center rounded-sm border hover:bg-foreground/2"
          download="segg.png"
          href={canvas?.toDataURL('image/png')}><img alt="download" src={saveImage} /></a
        >
      {/key}
    </div>
  </div>
</div>
