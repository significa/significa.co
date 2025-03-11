<script lang="ts">
  import Canvas from './canvas.svelte';
  import leftImage from './assets/left.svg';
  import { templateStrokes } from './template';
  import type { DrawingContent } from './types';
  import { apiClient } from '../../lib/drawings-api';

  export let drawingId: string | null = null;
  export let baseDrawingContent: DrawingContent = {
    canvas_width: 600,
    canvas_height: 700,
    strokes: templateStrokes
  };

  let authToken: string | null = null;

  const save = async (drawingContent: DrawingContent) => {
    if (authToken && drawingId) {
      await apiClient.PATCH('/api/public/drawings/{drawing_id}', {
        body: {
          content: drawingContent
        },
        params: {
          path: {
            drawing_id: drawingId
          },
          header: {
            'X-Drawing-Update-Auth-Token': authToken
          }
        }
      });
    } else {
      const { data } = await apiClient.POST('/api/public/drawings', {
        body: {
          forked_from_drawing_id: drawingId,
          content: drawingContent
        }
      });

      if (!data) {
        throw new Error('Failed to create drawing');
      }

      drawingId = data.id;
      authToken = data.plaintext_update_auth_token;
    }
  };
</script>

<div class="flex drop-shadow-lg">
  <div
    class="relative hidden items-center justify-center rounded-lg bg-white bg-gradient-to-l from-black/5 to-transparent to-30% xl:flex"
    style="width:{baseDrawingContent.canvas_width}px;height:{baseDrawingContent.canvas_height}px;"
  >
    <img src={leftImage} alt="Draw your segg" />
    <div class="dots" />
  </div>
  <div class="relative overflow-hidden rounded-lg">
    <Canvas
      {drawingId}
      width={baseDrawingContent.canvas_width}
      height={baseDrawingContent.canvas_height}
      on:change={({ detail: drawingContent }) => save(drawingContent)}
      templateStrokes={baseDrawingContent.strokes}
    />
    <div class="dots" />
  </div>
</div>

<style>
  .dots {
    pointer-events: none;
    position: absolute;
    inset: 16px;

    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
  }
</style>
