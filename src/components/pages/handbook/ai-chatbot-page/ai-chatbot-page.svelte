<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { Button, Input } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade } from 'svelte/transition';
  import { createBreakpointMediaQueryStore } from '$lib/stores/media';

  let searchInputValue = '';
  const desktop = createBreakpointMediaQueryStore('md');

  let messagesContainer: HTMLDivElement;

  // Scroll to bottom when messages change
  $: {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
</script>

<Seo
  title="placeholder"
  description="placeholder"
  image="placeholder"
  structureDataMarkup="placeholder"
/>
<div
  use:drawerLinks
  class="container mx-auto flex h-full flex-col justify-between px-container py-5 lg:py-10"
>
  <div
    class="flex flex-1 flex-col justify-end space-y-4 space-y-reverse overflow-y-auto pb-8"
    style="scroll-behavior: smooth;"
    bind:this={messagesContainer}
  >
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby message</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user question</span>
      </div>
    </div>
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby message</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user question</span>
      </div>
    </div>
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby message</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user question</span>
      </div>
    </div>
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby message</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user question</span>
      </div>
    </div>
    <!-- Shellby message (left, oldest) -->
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby message</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#cce4f5] p-3">
        <span class="text-sm">user question</span>
      </div>
    </div>
    <div class="flex justify-start">
      <div class="border-gray-200 max-w-xs rounded-lg border bg-[#ecdaa6] p-3">
        <span class="text-sm">shellby message</span>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="border-blue-200 max-w-xs rounded-lg border bg-[#a00] p-3">
        <span class="text-sm">user question</span>
      </div>
    </div>
  </div>
  <div class="sticky bottom-0 mt-4">
    <form id="search-form" class="relative mb-6 flex gap-2">
      <Input
        bind:value={searchInputValue}
        class={clsx('pr-20')}
        placeholder={$desktop ? 'Search! Because asking in Slack is overrated.' : 'Search!'}
        size="lg"
      />

      {#if searchInputValue}
        <div
          transition:fade={{ duration: 100 }}
          class="absolute right-1.5 top-1/2 -translate-y-1/2"
        >
          <Button type="submit" size="md" icon="handbook" variant="primary">Send</Button>
        </div>
      {/if}
    </form>
  </div>
</div>
