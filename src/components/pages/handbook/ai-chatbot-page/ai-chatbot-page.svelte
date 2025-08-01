<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { Button, Input } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade } from 'svelte/transition';
  import MessageCard from '$components/ai-chatbot/message-card.svelte';

  type Message = {
    type: 'user' | 'shellby';
    text: string;
    loading?: boolean;
    error?: boolean;
  };
  import { tick } from 'svelte';

  let searchInputValue = '';

  let messagesContainer: HTMLDivElement;

  // Simple shellby reply message
  const SHELLBY_REPLY = "This is Shellby's default reply.";

  // Handle form submit
  async function handleSendMessage(event: Event) {
    event.preventDefault();
    const trimmed = searchInputValue.trim();
    if (!trimmed) return;
    messages = [...messages, { type: 'user', text: trimmed }];
    searchInputValue = '';
    await tick();
    scrollToBottom();
    // Show loading message

    messages = [...messages, { type: 'shellby', text: '', loading: true, error: false }];
    await tick();
    scrollToBottom();
    // Simulate Shellby reply after 3s
    setTimeout(async () => {
      // Replace the last message (loading) with the real reply

      // Simulate error: set error to true and text to error message
      // messages[messages.length - 1].loading = false;
      // messages[messages.length - 1].error = true;
      // messages[messages.length - 1].text = "Oops! Something went wrong.";

      // Normal reply (no error)
      messages[messages.length - 1].loading = false;
      messages[messages.length - 1].text = SHELLBY_REPLY;

      await tick();
      scrollToBottom();
    }, 3000);
  }

  // Message array: type = 'user' | 'shellby', text = string, loading?: boolean

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
    { type: 'shellby', text: 'shellby message', error: true },
    { type: 'user', text: 'last message here' }
  ];

  // Scroll to bottom helper
  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
</script>

<Seo title="Shellby - AI Chatbot🥚" />
<div
  use:drawerLinks
  class="container mx-auto flex h-full flex-col justify-end px-container pb-0 lg:pb-8"
>
  <div class="hide-scrollbar space-y-4 overflow-y-auto px-2 py-8" bind:this={messagesContainer}>
    {#each messages as message}
      <MessageCard
        type={message.type}
        text={message.text}
        loading={message.loading}
        error={message.error}
      />
    {/each}
  </div>

  <form id="search-form" class="relative flex gap-2" on:submit|preventDefault={handleSendMessage}>
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
