<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { Button, Icon, Input } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade } from 'svelte/transition';
  import MessageCard from '$components/ai-chatbot/message-card.svelte';

  type Message = {
    type: 'user' | 'shellby';
    text: string;
    loading?: boolean;
    error?: boolean;
    errorText?: string;
  };
  import { afterUpdate } from 'svelte';

  let searchInputValue = '';

  let messagesContainer: HTMLDivElement;

  $: isLoading = messages.some((m) => m.loading);
  // Handle form submit
  async function handleSendMessage(event: Event) {
    event.preventDefault();
    const trimmed = searchInputValue.trim();
    if (!trimmed) return;
    messages = [...messages, { type: 'user', text: trimmed }];
    searchInputValue = '';
    messages = [...messages, { type: 'shellby', text: '', loading: true, error: false }];
    try {
      const response = await fetch('https://handbook-search-staging.significa.dev/api/chat/query', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: trimmed })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      messages[messages.length - 1].loading = false;
      const answer = data?.data?.answer;
      if (typeof answer === 'string' && answer.trim() !== '') {
        messages[messages.length - 1].text = answer;
      } else {
        messages[messages.length - 1].text = 'No reply received.';
      }
    } catch {
      messages[messages.length - 1].loading = false;
      messages[messages.length - 1].error = true;
      messages[messages.length - 1].errorText = 'Sorry, something went wrong.';
      messages[messages.length - 1].text = '';
    }
  }

  // Message array: type = 'user' | 'shellby', text = string, loading?: boolean

  let messages: Message[] = [
    { type: 'shellby', text: 'Hello! I am Shellby, your AI assistant. How can I help you today?' }
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
    {#each messages as message, i}
      <div
        transition:fade={{ duration: 200 }}
        class={i < messages.length - 2 ? 'opacity-35 transition-opacity duration-300' : ''}
      >
        <MessageCard
          type={message.type}
          text={message.text}
          loading={message.loading}
          error={message.error}
          errorText={message.errorText}
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
      disabled={isLoading}
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

  <div class="mt-4 flex items-center gap-2 text-sm text-foreground-secondary">
    <Icon icon="info" />
    <span>I'm in beta stage. I can only answer one message at a time :(</span>
  </div>
</div>
