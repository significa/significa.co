<script lang="ts">
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import { fly } from 'svelte/transition';
  import { circInOut } from 'svelte/easing';

  type Eggs = 'attach-multiple' | 'attach' | 'error' | 'excited' | 'idle' | 'success' | 't-shirt';
  const files = import.meta.glob('./eggs/*.svg', { as: 'raw', eager: true });
  const eggs = Object.entries(files).reduce((acc, [path, file]) => {
    const name = path.replace('./eggs/', '').replace('.svg', '') as Eggs;
    acc[name] = file;
    return acc;
  }, {} as Record<Eggs, string>);

  export let page: GetAQuotePageStoryblok;

  let name = '';
  let budget = '';
  let attachments = '';

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
  } else if (['50k - 100k', '100k+'].includes(budget)) {
    character = 'excited';
  } else if (name && name.length > 3) {
    character = 't-shirt';
  } else {
    character = 'idle';
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
        {#if visible || name}
          <div
            transition:fly={{ y: 500, opacity: 1, easing: circInOut, duration: 230 }}
            aria-hidden="true"
            class="absolute -bottom-20 left-2 hidden drop-shadow lg:block"
            style="transform: rotate(-10deg)"
          >
            {@html eggs[character]}
            {#if character === 't-shirt' && name}
              <div
                class="absolute left-36 top-72 line-clamp-2 w-24 text-center font-comic font-bold leading-snug"
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
