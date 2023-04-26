<script lang="ts">
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import { fly } from 'svelte/transition';
  import { circOut } from 'svelte/easing';

  type Eggs =
    | 'attach-multiple'
    | 'attach'
    | 'error'
    | 'budget10'
    | 'budget25'
    | 'budget50'
    | 'budget100'
    | 'idle'
    | 'success'
    | 't-shirt'
    | 'hello';
  const files = import.meta.glob('./eggs/*.svg', { as: 'raw', eager: true });
  const eggs = Object.entries(files).reduce((acc, [path, file]) => {
    const name = path.replace('./eggs/', '').replace('.svg', '') as Eggs;
    acc[name] = file;
    return acc;
  }, {} as Record<Eggs, string>);

  export let page: GetAQuotePageStoryblok;

  let name = '';
  let email = '';
  let budget = '';
  let message = '';
  let attachments = '';
  $: dirty = name || email || budget || message || attachments;

  let visible = false;
  let error = false;
  let success = false;

  let character: Eggs = 'idle';

  $: if (error) {
    character = 'error';
  } else if (success) {
    character = 'success';
  } else if (attachments.split(',').length > 1) {
    character = 'attach-multiple';
  } else if (attachments) {
    character = 'attach';
  } else if (['10k - 25k'].includes(budget)) {
    character = 'budget10';
  } else if (['25k - 50k'].includes(budget)) {
    character = 'budget25';
  } else if (['50k - 100k'].includes(budget)) {
    character = 'budget50';
  } else if (['100k+'].includes(budget)) {
    character = 'budget100';
  } else if (name && name.length > 3) {
    character = 't-shirt';
  } else if (message && message.length > 3) {
    character = 'idle';
  } else {
    character = 'hello';
  }
</script>

<svelte:head />
<div
  class={clsx(
    'container relative mx-auto mt-10 min-h-[75vh] gap-8 overflow-hidden px-container pb-12',
    'md:mt-14 md:pb-20',
    'lg:mt-20 lg:flex lg:justify-between lg:pb-32'
  )}
>
  <div class="flex-1">
    <div class="lg:max-w-xl">
      <h1 class="text-7xl">
        {page.title}<br />
        <span class="text-foreground-secondary">{page.subtitle}</span>
      </h1>
    </div>
  </div>
  <div class={clsx('flex-1', 'lg:flex lg:justify-end')}>
    <div class={clsx('mt-5 w-full', 'lg:max-w-xl')}>
      <div>
        <ContactForm
          variant="quote"
          bind:name
          bind:budget
          bind:attachments
          bind:message
          on:focus={() => {
            visible = true;
            success = false;
            error = false;
          }}
          on:blur={() => {
            visible = false;
          }}
          on:success={() => (success = true)}
          on:error={() => (error = true)}
        />
        {#if visible || dirty}
          <div
            data-theme="light"
            transition:fly={{ y: 500, opacity: 1, easing: circOut, duration: 250 }}
            aria-hidden="true"
            class="absolute -bottom-20 left-2 hidden bg-transparent drop-shadow lg:block"
            style="transform: rotate(-10deg)"
          >
            {@html eggs[character]}
            {#if character === 't-shirt' && name}
              <div
                class="absolute left-56 top-[68px] line-clamp-2 w-24 text-center font-comic font-bold leading-snug"
                style="transform: rotate(-4deg)"
              >
                I <span class="text-error">{'<3'}</span>
                {name}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
