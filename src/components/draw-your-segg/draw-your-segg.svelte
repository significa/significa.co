<script lang="ts">
  import { onMount } from 'svelte';
  import { tools, colors, widths, type Stroke, type Point, type Tool } from './config';

  let canvas: HTMLCanvasElement;
  let width = 600;
  let height = 700;

  let tool = tools.pencil;
  let drawing: Stroke[] = [];
  let points: Point[] = [];

  let isDrawing = false;

  function setCanvasTool(canvas: HTMLCanvasElement, tool: Tool) {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = widths[tool.width];
    ctx.strokeStyle = colors[tool.color];
  }

  function onStart() {
    isDrawing = true;
    setCanvasTool(canvas, tool);
    canvas?.getContext('2d')?.beginPath();
  }

  function onEnd() {
    isDrawing = false;
    canvas?.getContext('2d')?.closePath();

    // commit the current stroke to the drawing
    if (points.length) {
      drawing = [...drawing, { ...tool, points }];
    }

    // reset the points
    points = [];
  }

  function onMove(e: MouseEvent) {
    if (!isDrawing) return;

    // add the current point to the points
    points = [...points, [e.offsetX, e.offsetY]];

    const ctx = canvas?.getContext('2d');
    ctx?.lineTo(e.offsetX, e.offsetY);
    ctx?.stroke();
  }

  $: {
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, width, height);

    drawing.forEach((stroke) => {
      setCanvasTool(canvas, stroke);

      if (!ctx) return;

      ctx.beginPath();

      if (stroke.points.length) {
        const [initialX, initialY] = stroke.points[0];
        ctx.moveTo(initialX, initialY);

        stroke.points.forEach(([x, y]) => {
          ctx.lineTo(x, y);
          ctx.stroke();
        });
      }

      ctx.closePath();
    });
  }

  onMount(() => {
    // double canvas size for retina
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas?.getContext('2d');
    ctx?.scale(2, 2);
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

  <button
    on:click={() => {
      tool = tools.pencil;
    }}>Pencil</button
  >
  <button
    on:click={() => {
      tool = tools.blackBrush;
    }}>Black Brush</button
  >
  <button
    on:click={() => {
      tool = tools.yellowBrush;
    }}>Yellow Brush</button
  >
  <button
    on:click={() => {
      tool = tools.greyBrush;
    }}>Grey Brush</button
  >
</div>
