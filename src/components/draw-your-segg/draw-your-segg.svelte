<script lang="ts">
  import { tools, colors, widths, type Stroke, type Point, type Tool } from './config';
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let width = 600;
  let height = 700;

  let tool = tools.pencil;
  let drawing: Stroke[] = [];
  let points: Point[] = [];

  let isDrawing = false;

  function getMidBetween([x1, y1]: Point, [x2, y2]: Point): Point {
    return [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2];
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
      drawing = [...drawing, { ...tool, points }];
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
      class="foo bg-white"
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
</div>

<style>
  .foo {
    background-image: url("data:image/svg+xml,%3Csvg width='221' height='360' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M197.656 62.765c.707.1 1.97 1.767 2.323 2.373.606 1.112.808 2.425 1.313 3.536 1.465 3.333.859 7.272 2.526 10.656a130.321 130.321 0 0 1 3.383 7.12c1.364 2.98 2.071 6.212 3.535 9.192 1.162 2.374 2.829 4.192 3.738 6.717.656 1.919.656 3.99.656 6.06 0 1.818.556 3.586.606 5.404.202 7.98 1.465 15.858 1.465 23.837M216.9 137.357v36.059c0 2.626-.051 5.051-.707 7.626a107.7 107.7 0 0 1-1.667 5.757c-.404 1.263-.353 2.778-1.06 3.99-1.212 2.222-3.232 4.444-3.939 6.97-.455 1.666-1.011 3.383-1.566 5.05M207.703 203.061c0 1.818-.96 2.576-1.92 3.99-.909 1.414-.959 3.333-1.666 4.848-.859 1.919-1.01 3.687-2.525 5.202-1.818 1.818-4.091 3.182-5.909 5-1.111 1.111-1.566 2.323-2.222 3.687-1.111 2.272-3.333 3.484-4.646 5.605-2.273 3.687-7.02 5.455-10 8.434-1.414 1.414-3.131 2.627-4.596 3.99-1.01.96-2.323 1.364-3.383 2.222-1.061.808-2.526 1.919-3.687 2.475-1.414.656-3.232 1.06-4.444 2.121-2.525 2.222-6.768 2.121-9.596 3.687-.959.505-2.272.909-3.384 1.06-1.515.152-2.929 1.162-4.444 1.162M145.284 256.039c-2.727 0-5.151.101-7.575 1.161-1.566.707-3.03 1.869-4.596 2.424-1.667.556-3.333.859-5.05 1.162-3.788.707-7.879 2.02-11.767 2.02-3.889 0-7.626.303-11.515.303-6.717 0-12.98-2.979-19.646-3.232-3.282-.101-5.959-2.172-9.09-2.98-.91-.252-2.475-.606-3.182-1.262-.707-.606-1.414-1.919-2.12-2.323M70.698 254.574c-1.717 0-3.08-1.06-4.697-1.464-1.413-.354-2.777-.556-4.14-1.061-2.374-.858-4.445-1.717-6.667-2.98-2.07-1.161-4.545-2.121-6.363-3.686-.96-.808-2.071-1.465-2.98-2.374-1.01-1.01-1.768-2.323-2.98-3.03-1.818-1.061-3.686-3.283-5.202-4.798-1.464-1.464-2.323-1.818-3.585-3.384-.758-.909-2.727-2.626-3.636-3.535-.505-.505-1.01-1.111-1.617-1.464-.505-.303-.555-1.111-1.06-1.414-1.01-.606-1.869-1.616-2.98-2.222-1.414-.758-2.323-2.677-3.838-3.182' stroke='%23CCCCCC' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M24.785 222.303c-1.666-.202-3.737-3.434-4.899-4.596-.96-.959-2.676-2.222-2.777-3.737-.152-1.667-1.162-3.333-1.616-4.949-.404-1.465-1.263-3.283-2.071-4.596-1.717-2.727-3.737-4.848-4.242-8.283a72.446 72.446 0 0 0-1.111-5.757c-.455-1.767-.505-3.99-1.162-5.606-.707-1.666-.555-3.838-.96-5.605-.353-1.718-1.11-3.586-1.161-5.303-.101-3.283 0-6.465 0-9.747v-5.051c0-1.06-.909-1.919-.909-2.828 0-2.424-.859-5.1-1.263-7.525-.1-.656 0-3.585-.505-3.838M2.005 144.781c0-3.889-.556-8.232.505-11.919 1.464-4.898.656-10.706.656-15.756 0-4.849 1.01-10.909 3.687-15.101 1.111-1.717 1.263-4.14 1.768-6.06.707-2.525 1.01-5.151 1.616-7.676' stroke='%23CCCCCC' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M1 139.125C1 69.431 47.462 1 107.561 1 191.9 1 218.414 91.804 219.677 147.155c-1.263 89.996-58.583 114.944-106.561 114.944C62.361 262.099 1 240.938 1 139.125Z' stroke='%23CCCCCC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M202.956 72.935c0-9.805-6.959-22.782-12.751-30.229-1.707-2.194-3.493-3.905-5.238-6.148-1.838-2.364-5.356-3.13-6.831-5.636-1.86-3.162-8.142-8.73-11.556-10.247-5.282-2.347-9.584-6.855-15.371-8.14-4.945-1.1-10.23-2.93-15.655-3.132-12.291-.455-23.583-8.197-36.092-8.197-12.178 0-20.529 3.272-30.228 10.816-5.154 4.008-10.205 8.8-15.883 11.955-5.014 2.785-6.813 9.86-11.784 12.068-9.495 4.22-17.62 17.81-21.803 26.643-3.603 7.605-8.705 15.86-10.532 24.08-1.51 6.797-6.091 12.744-6.091 19.982' stroke='%23CCCCCC' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M71.938 258.426v96l21.6 4.08M142.547 258.426v96l21.6 4.08' stroke='%23CCCCCC' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M70.754 255.384c0 6.791-.849 17.272-.006 24.017 1.019 8.149 1.512 16.393 2.188 24.578.3 3.637.275 7.398-.088 11.03-.322 3.223-.498 6.492-.906 9.703-.118.929.108 1.923-.144 2.829-.087.315-.283.911-.298 1.194-.108 2.05.858 4.206 1.348 6.167.716 2.864.243 6.217.243 9.15v7.56c0 1.465 2.252 1.85 3.426 2.343 2.047.858 4.19 1.453 6.366 1.878 2.282.447 4.572.97 6.874 1.305 1.402.203 2.886.195 4.222.641M140.987 260.837c0 6.702-.457 13.457.805 20.046.917 4.79 1.194 9.577 1.194 14.451 0 6.926-.054 13.816.444 20.726.43 5.975.881 11.904 1.291 17.853.117 1.692.264 3.315.264 5.025 0 .708-.136 1.442-.375 2.11-.312.874-.024 1.858-.25 2.763-.257 1.026-.125 2.181-.125 3.234 0 1.1-.25 2.129-.25 3.235 0 1.257-.806 3.538-.194 4.761 1.623 3.246 6.854 2.249 9.676 2.249h5.261c.906 0 4.806.116 5.247 1' stroke='%23CCCCCC' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center 180px;
  }
</style>
