<script lang="ts">
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import { fly } from 'svelte/transition';
  import { circOut } from 'svelte/easing';
  import { Confetti } from 'svelte-confetti';
  import { CONFETTI_COLOR_ARRAY } from '$lib/constants';
  import { truncateText } from '$lib/utils/strings';

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
  const eggs = Object.entries(files).reduce(
    (acc, [path, file]) => {
      const name = path.replace('./eggs/', '').replace('.svg', '') as Eggs;
      acc[name] = file;
      return acc;
    },
    {} as Record<Eggs, string>
  );

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

  $: truncatedText = truncateText(name, 17);

  let lastChangedInput: string | undefined;

  const onInput = (value: CustomEvent<string>) => {
    lastChangedInput = value.detail;
  };

  $: if (lastChangedInput !== 'budget' && budget.length) {
    lastChangedInput = 'budget';
  }

  $: if (error) {
    character = 'error';
  } else if (success) {
    character = 'success';
  } else if (lastChangedInput === 'attachments') {
    if (attachments.split(',').length > 1) {
      character = 'attach-multiple';
    } else {
      character = 'attach';
    }
  } else if (lastChangedInput === 'budget') {
    if (['15.000€ to 50.000€'].includes(budget)) {
      character = 'budget10';
    } else if (['50.000€ to 100.000€'].includes(budget)) {
      character = 'budget10';
    } else if (['100.000€ to 200.000€'].includes(budget)) {
      character = 'budget10';
    } else if (['200.000€ to 300.000€'].includes(budget)) {
      character = 'budget25';
    } else if (['300.000€ to 400.000€'].includes(budget)) {
      character = 'budget50';
    } else if (['400.000€ and above'].includes(budget)) {
      character = 'budget100';
    }
  } else if (
    (lastChangedInput === 'name' ||
      lastChangedInput === 'email' ||
      lastChangedInput === 'message') &&
    name &&
    name.length > 2
  ) {
    character = 't-shirt';
  } else {
    character = 'hello';
  }
</script>

<svelte:head />

{#if character === 'success'}
  <div
    class="pointer-events-none fixed left-0 top-[-50px] flex h-screen w-screen justify-center overflow-hidden"
  >
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[1, 2000]}
      amount="200"
      fallDistance="100vh"
      colorArray={CONFETTI_COLOR_ARRAY}
    />
  </div>
{/if}
<div
  class={clsx(
    'container relative mx-auto mt-10 gap-8 px-container pb-12',
    'md:mt-14 md:pb-20',
    'lg:mt-20 lg:flex lg:justify-between lg:pb-32'
  )}
>
  <div class="flex-2">
    <div class="lg:max-w-xl h-full relative flex flex-col justify-between">
      <div>
        <h1 class="text-7xl text-foreground-secondary relative">
          {page.title}
        </h1>
        <span class="text-7xl">{page.subtitle}</span>
      </div>
      {#if visible || dirty}
        <!-- eslint-disable svelte/no-at-html-tags -->
        <div
          data-theme="light"
          transition:fly|global={{ y: 500, opacity: 1, easing: circOut, duration: 250 }}
          aria-hidden="true"
          class="container mx-auto mt-10 gap-8 px-container relative bg-transparent pointer-events-none grow hidden lg:flex"
        >
          <div class="-mb-12 -ml-16 sticky bottom-0 mt-auto">
            {@html eggs[character]}
            {#if character === 't-shirt' && truncatedText}
              <div
                class="absolute left-[235px] top-[40px] line-clamp-2 flex h-[76px] w-36 items-center justify-center text-center font-comic font-bold leading-snug"
                style="transform: rotate(-4deg);"
              >
                <div class="h-fit w-24">
                  I <span class="text-error">{'<3'}</span>
                  {truncatedText}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class={clsx('flex-1', 'lg:flex lg:justify-end')}>
    <div class={clsx('mt-5 w-full', 'lg:max-w-3xl')}>
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
          on:input={onInput}
        />
      </div>
    </div>
  </div>
</div>
