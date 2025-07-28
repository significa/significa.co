<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  // import { Button, Input } from '@significa/svelte-ui';
  // import clsx from 'clsx';
  // import { fade } from 'svelte/transition';
  // import { createBreakpointMediaQueryStore } from '$lib/stores/media';

  // let searchInputValue = '';
  // const desktop = createBreakpointMediaQueryStore('md');
</script>

<Seo
  title="placeholder"
  description="placeholder"
  image="placeholder"
  structureDataMarkup="placeholder"
/>
<div
  use:drawerLinks
  class="container mx-auto h-full overflow-y-auto bg-[#a00] px-container py-5 lg:py-10"
>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- CHAT MESSAGES -->
  <div class="space-y-4">
    <!-- Shellby message (left) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby 1</span>
      </div>
    </div>

    <!-- User message (right) -->
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user 1</span>
      </div>
    </div>
  </div>
  <!-- MESSAGE INPUT -->
</div>

<!-- <div class="sticky bottom-10 mt-6">
  <form id="search-form" class="relative mb-6 flex gap-2">
    <Input
      bind:value={searchInputValue}
      class={clsx('pr-20')}
      placeholder={$desktop ? 'Search! Because asking in Slack is overrated.' : 'Search!'}
      size="lg"
    />

    {#if searchInputValue}
      <div transition:fade={{ duration: 100 }} class="absolute right-1.5 top-1/2 -translate-y-1/2">
        <Button type="submit" size="md" icon="handbook" variant="primary">Send</Button>
      </div>
    {/if}
  </form>
</div> -->
