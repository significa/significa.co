<script lang="ts">
  import { Radio } from '@significa/svelte-ui';
  import ContactForm from './forms/contact-form.svelte';
  import GetAQuoteForm from './forms/get-a-quote-form.svelte';
  import PositionForm from './forms/position-form.svelte';

  type FormType = 'quote' | 'position' | 'contact';
  export let variant: undefined | FormType = undefined;

  let selected: undefined | FormType = variant || 'quote';
  const options = [
    { type: 'quote', title: 'Get a quote', subtitle: 'For new projects' },
    { type: 'position', title: 'Apply to position', subtitle: 'Be part of the team' },
    { type: 'contact', title: 'Talk to us', subtitle: 'General enquiries' }
  ];
</script>

<section class="container mt-10 mb-40">
  <div class="grid grid-cols-3 overflow-hidden rounded-lg border border-border">
    <div class="col-span-1 hidden p-8 xl:block">
      <h3 class="text-4xl">
        How can we help?<br />
        Let's work together
      </h3>
      <p class="mt-4 text-lg leading-tight">
        Your time is scarce and life is hectic, so the bottom line is we think, design, and develop,
        manage and launch digital our incredible products.
      </p>
    </div>
    <div class="col-span-3 bg-background-panel p-8 xl:col-span-2 xl:border-l xl:border-border">
      {#if variant === undefined}
        <div class="mb-8 border-b border-border pb-8">
          <p class="leading-none">What are you looking for?</p>
          <p class="mt-1 text-foreground-secondary">Please choose an option below</p>

          <div class="mt-4 flex flex-col gap-4 md:flex-row">
            {#each options as option}
              <label
                for={option.type}
                class="flex w-full items-center gap-3 rounded-md border border-border p-4 transition-all hover:bg-foreground/2"
              >
                <Radio id={option.type} bind:group={selected} value={option.type} />
                <div>
                  <p class="font-medium leading-none">{option.title}</p>
                  <p class="mt-0.5 leading-none text-foreground-secondary">{option.subtitle}</p>
                </div>
              </label>
            {/each}
          </div>
        </div>
      {/if}

      {#if selected === 'quote'}
        <GetAQuoteForm />
      {:else if selected === 'position'}
        <PositionForm />
      {:else if selected === 'contact'}
        <ContactForm />
      {/if}
    </div>
  </div>
</section>
