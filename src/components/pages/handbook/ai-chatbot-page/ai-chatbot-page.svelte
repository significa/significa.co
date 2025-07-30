<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { Button, Input } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade } from 'svelte/transition';
  import { createBreakpointMediaQueryStore } from '$lib/stores/media';
  import Shellby from '$components/ai-chatbot/shellby.svelte';
  import SeggBinoculars from '$components/ai-chatbot/segg-binoculars.svelte';

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
  <div class="hide-scrollbar space-y-4 overflow-y-auto pb-8" bind:this={messagesContainer}>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>

    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">user question</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
    </div>
    <!-- Shellby message (bot) -->
    <div class="flex items-start gap-2">
      <Shellby class="h-14 w-auto shrink-0" />
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">shellby message</span>
      </div>
    </div>

    <!-- User message -->
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-xs rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">last message here</span>
      </div>
      <SeggBinoculars class="h-12 w-auto shrink-0" />
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
