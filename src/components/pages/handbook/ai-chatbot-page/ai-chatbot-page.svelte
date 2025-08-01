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
  import { afterUpdate } from 'svelte';

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
    // Add a small delay before showing Shellby loading message
    setTimeout(async () => {
      messages = [...messages, { type: 'shellby', text: '', loading: true, error: false }];
      // Simulate Shellby reply after 3s
    }, 400);

    setTimeout(async () => {
      // Normal reply (no error)
      messages[messages.length - 1].loading = false;
      messages[messages.length - 1].text = SHELLBY_REPLY;
    }, 3000);
  }

  // Message array: type = 'user' | 'shellby', text = string, loading?: boolean

  let messages: Message[] = [
    {
      type: 'user',
      text: 'big user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsumbig user question, ipsum dolor sit amet? ipsum dolor sit amet, consectetur adipiscing elit. Ipsum '
    },
    { type: 'shellby', text: 'shellby message', error: true },
    { type: 'user', text: 'last message here' }
  ];

  // Scroll to bottom helper
  // Scroll to bottom helper with smooth behavior
  function scrollToBottom(node: HTMLDivElement) {
    if (node) {
      node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }
  }

  // Scroll to bottom after messages update
  afterUpdate(() => {
    if (messagesContainer) scrollToBottom(messagesContainer);
  });
</script>

<Seo title="Shellby - AI Chatbot🥚" />
<div
  use:drawerLinks
  class="container mx-auto flex h-full flex-col justify-end px-container pb-0 lg:pb-8"
>
  <div class="hide-scrollbar space-y-4 overflow-y-auto px-2 py-8" bind:this={messagesContainer}>
    {#each messages as message}
      <div transition:fade={{ duration: 200 }}>
        <MessageCard
          type={message.type}
          text={message.text}
          loading={message.loading}
          error={message.error}
        />
      </div>
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
        <Button class="md:hidden" type="submit" size="md" icon="arrow-right" variant="primary"
        ></Button>

        <Button class="hidden md:flex" type="submit" size="md" icon="arrow-right" variant="primary"
          >Send</Button
        >
      </div>
    {/if}
  </form>
</div>
