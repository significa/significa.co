<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { Button, Input } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade } from 'svelte/transition';
  import MessageCard from '$components/ai-chatbot/message-card.svelte';

  let searchInputValue = '';

  let messagesContainer: HTMLDivElement;

  // Message array: type = 'user' | 'shellby', text = string
  type Message = { type: 'user' | 'shellby'; text: string };
  let messages: Message[] = [
    {
      type: 'user',
      text: 'big user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum '
    },
    {
      type: 'shellby',
      text: 'shellby message, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum '
    },
    {
      type: 'user',
      text: 'big user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum '
    },
    { type: 'shellby', text: 'shellby message' },
    {
      type: 'user',
      text: 'big user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum '
    },
    { type: 'shellby', text: 'shellby message' },
    { type: 'user', text: 'last message here' }
  ];

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
  class="container mx-auto flex h-full flex-col justify-end px-container pb-0 lg:pb-8"
>
  <div class="hide-scrollbar space-y-4 overflow-y-auto px-2 py-8" bind:this={messagesContainer}>
    <MessageCard {messages} />
  </div>

  <form id="search-form" class="relative flex gap-2">
    <Input
      bind:value={searchInputValue}
      class={clsx('pr-20')}
      placeholder={'Enter a prompt here'}
      size="lg"
    />

    {#if searchInputValue}
      <div transition:fade={{ duration: 100 }} class="absolute right-1.5 top-1/2 -translate-y-1/2">
        <Button type="submit" size="md" icon="handbook" variant="primary">Send</Button>
      </div>
    {/if}
  </form>
</div>
