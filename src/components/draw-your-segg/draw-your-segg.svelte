<script lang="ts">
  import template from './template.json';
  import { tools, colors, widths, type Stroke, type Point, type Tool } from './config';
  import { onMount } from 'svelte';
  import { getMidBetween, simplify } from './utils';

  let canvas: HTMLCanvasElement;
  let width = 600;
  let height = 700;

  let tool = tools.pencil;
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
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = widths[tool.width];
    ctx.strokeStyle = colors[tool.color];
  }

  function draw(canvas: HTMLCanvasElement, points: Point[]) {
    const ctx = canvas?.getContext('2d');

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
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, width, height);
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

    const ctx = canvas?.getContext('2d');
    ctx?.save();
    ctx?.beginPath();
  }

  function onMove(e: MouseEvent) {
    if (!isDrawing) return;

    // reset "redo"
    undone = [];

    points = [...points, [e.offsetX, e.offsetY]];

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
    const ctx = canvas.getContext('2d');
    ctx?.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  });
</script>

<div>
  <div class="flex">
    <canvas
      {width}
      {height}
      class="bg-white"
      bind:this={canvas}
      on:mousedown={onStart}
      on:mouseup={onEnd}
      on:mouseleave={onEnd}
      on:mousemove={onMove}
    />
    <div
      style="width:{width}px; height:{height}px;"
      class="overflow-scroll bg-background-offset text-sm"
    >
      <pre>
        {JSON.stringify(drawing, null, 2)}
      </pre>
    </div>
  </div>

  <div class="flex gap-4">
    <button
      on:click={() => {
        tool = tools.pencil;
      }}>Pencil</button
    >
    <button
      on:click={() => {
        tool = tools.black;
      }}>Black Brush</button
    >
    <button
      on:click={() => {
        tool = tools.yellow;
      }}>Yellow Brush</button
    >
    <button
      on:click={() => {
        tool = tools.grey;
      }}>Grey Brush</button
    >
    <button
      on:click={() => {
        tool = tools.white;
      }}>White Brush</button
    >
  </div>

  <div class="flex gap-4">
    {#if canUndo}
      <button on:click={undo}>UNDO</button>
    {/if}
    {#if canRedo}
      <button on:click={redo}>REDO</button>
    {/if}
  </div>
</div>
