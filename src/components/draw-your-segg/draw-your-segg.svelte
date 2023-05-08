<script lang="ts">
  import Canvas from './canvas.svelte';
  import leftImage from './assets/left.svg';
  import { page } from '$app/stores';
  import { Spinner } from '@significa/svelte-ui';
  import { isValidDrawing, type Drawing } from './types';
  import { template as base } from './template';
  import { onMount } from 'svelte';

  const width = 600;
  const height = 700;

  let template = base;

  // load drawing from DB
  let loading = $page.params.segg ? true : false;
  const load = async (id: string) => {
    const res = await fetch(`/segg?id=${encodeURIComponent(id)}`);
    if (res.ok) {
      const json = await res.json();
      const parsed = JSON.parse(json.drawing);
      if (parsed && isValidDrawing(parsed)) {
        template = parsed;
      }
    }
    loading = false;
  };
  onMount(() => {
    const savedId = $page.params.segg;
    if (savedId) load(savedId);
  });

  // save drawing in DB
  let dbId: string | null = null;
  const save = async (drawing: Drawing) => {
    const res = await fetch('/segg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: dbId, drawing })
    });

    // save ID
    if (res.ok) {
      dbId = await res.json();
    }
  };
</script>

<div class="flex drop-shadow-lg">
  <div
    class="relative flex items-center justify-center rounded-lg bg-white bg-gradient-to-l from-black/5 to-transparent to-30%"
    style="width:{width}px;height:{height}px;"
  >
    <img src={leftImage} alt="Draw your segg" />
    <div class="dots" />
  </div>
  <div class="relative overflow-hidden rounded-lg">
    {#if loading}
      <div
        class="flex items-center justify-center bg-white"
        style="width:{width}px;height:{height}px;"
      >
        <Spinner />
      </div>
    {:else}
      <Canvas {width} {height} on:change={({ detail }) => save(detail)} {template} />
    {/if}
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
