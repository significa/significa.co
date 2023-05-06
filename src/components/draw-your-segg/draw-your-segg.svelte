<script lang="ts">
  import template from './template.json';
  import { colors, widths, type Stroke, type Point, type Tool, cursors, tools } from './config';
  import { onMount } from 'svelte';
  import { getMidBetween, simplify } from './utils';
  import Tools from './tools.svelte';
  import saveImage from './assets/save.svg';
  import undoImage from './assets/undo.svg';
  import redoImage from './assets/redo.svg';

  let canvas: HTMLCanvasElement;
  let width = 600;
  let height = 700;

  let tool: Tool = tools.pencil;
  let drawing: Stroke[] = template as unknown as Stroke[];
  let points: Point[] = [];

  let isDrawing = false;
  let undone: Stroke[] = [];
  $: canUndo = drawing.length > template.length;
  $: canRedo = !!undone.length;

  function undo() {
    if (!canUndo) return;

    undone = [...undone, drawing[drawing.length - 1]];
    drawing = drawing.slice(0, -1);
  }

  function redo() {
    if (!canRedo) return;

    drawing = [...drawing, undone[undone.length - 1]];
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

  function renderFullDrawing(canvas: HTMLCanvasElement, drawing: Stroke[]) {
    clear();

    drawing.forEach((stroke) => {
      setCanvasTool(canvas, stroke);
      draw(canvas, stroke.points);
    });

    setCanvasTool(canvas, tool);
  }

  function onStart() {
    isDrawing = true;

    const ctx = canvas?.getContext('2d', { alpha: false });
    ctx?.save();
    ctx?.beginPath();
  }

  function onMove(x: number, y: number) {
    if (!isDrawing) return;

    // reset "redo"
    undone = [];

    points = [...points, [x, y]];

    // draw the entire drawing
    renderFullDrawing(canvas, drawing);

    // plus the current stroke
    draw(canvas, points);
  }

  function onEnd() {
    isDrawing = false;

    // commit the current stroke to the drawing
    if (points.length) {
      drawing = [...drawing, { ...tool, points: simplify(points, 2) }];
    }

    // reset the points
    points = [];
  }

  $: renderFullDrawing(canvas, drawing);

  // set the canvas size (double for retina)
  onMount(() => {
    // Get the DPR and size of the canvas
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx?.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
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
    style="background:white; cursor: url({cursors.get(tool)}) 5 {widths[tool.width] / 2}, auto;"
    bind:this={canvas}
    on:touchstart={onStart}
    on:mousedown={onStart}
    on:touchend={onEnd}
    on:mouseup={onEnd}
    on:mouseleave={onEnd}
    on:mousemove={(e) => onMove(e.offsetX, e.offsetY)}
    on:touchmove={(e) => {
      const touch = e.touches[0];
      // onMove with x and y (taking into account the canvas position on screen)
      onMove(
        touch.clientX - canvas.getBoundingClientRect().left,
        touch.clientY - canvas.getBoundingClientRect().top
      );
    }}
  />
  <div class="absolute bottom-2 left-2 flex h-8 items-center justify-between rounded-sm border">
    {#each undoActions as [alt, action, condition, image], i}
      {#if i > 0}
        <div class="h-8 border-r" />
      {/if}
      <button
        disabled={!condition}
        class="flex h-8 w-8 items-center justify-center hover:bg-foreground/2 disabled:pointer-events-none disabled:opacity-50"
        on:click={action}
      >
        <img {alt} src={image} />
      </button>
    {/each}
  </div>

  <Tools bind:tool />

  <a
    class="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-sm border hover:bg-foreground/2"
    download="segg.png"
    href={canvas?.toDataURL('image/png')}><img alt="download" src={saveImage} /></a
  >
</div>
