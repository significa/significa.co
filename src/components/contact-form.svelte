<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import {
    Button,
    FileInput,
    FloatingInput,
    FloatingSelect,
    FloatingTextarea,
    Link,
    Radio,
    TextButton
  } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';

  type FormType = 'quote' | 'career' | 'contact';
  export let variant: undefined | FormType = undefined;

  let type: FormType = variant || 'quote';
  const options = [
    { type: 'quote', title: 'Get a quote', subtitle: 'For new projects' },
    { type: 'career', title: 'Apply to position', subtitle: 'Be part of the team' },
    { type: 'contact', title: 'Talk to us', subtitle: 'General enquiries' }
  ];

  const DEFAULT_POSITION = 'Spontaneous application';

  let name = '';
  let email = '';
  let budget = '';
  let position = DEFAULT_POSITION;
  let message = '';
  let attachments: FileList | undefined = undefined;

  let fileInput: HTMLInputElement;

  const budgetOptions = ['10k - 25k', '25k - 50k', '50k - 100k', '100k+'];
  const jobs = [DEFAULT_POSITION, ...($page.data.jobs || []).map((j: ISbStoryData) => j.name)];

  let loading = false;
</script>

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
          <Radio id={option.type} bind:group={type} value={option.type} />
          <div>
            <p class="font-medium leading-none">{option.title}</p>
            <p class="mt-0.5 leading-none text-foreground-secondary">{option.subtitle}</p>
          </div>
        </label>
      {/each}
    </div>
  </div>
{/if}
<form
  id="contact-form"
  method="POST"
  action={{ quote: '?/quote', career: '?/career', contact: '?/contact' }[type]}
  use:enhance={() => {
    loading = true;

    return async ({ update }) => {
      update();

      attachments = undefined;
      loading = false;
    };
  }}
>
  <div class="flex flex-col gap-4">
    <div class="flex w-full flex-col gap-4 md:flex-row">
      <FloatingInput
        error={!!$page.form?.error?.messages.name}
        name="name"
        class="w-full"
        label={$page.form?.error?.messages.name || 'Name'}
        bind:value={name}
      />
      <FloatingInput
        error={!!$page.form?.error?.messages.email}
        name="email"
        type="email"
        class="w-full"
        label={$page.form?.error?.messages.email || 'Email address'}
        bind:value={email}
      />
      {#if type === 'quote'}
        <FloatingSelect name="budget" class="w-full" label="Budget range" bind:value={budget}>
          <option value="">Select budget</option>
          {#each budgetOptions as option}
            <option value={option}>{option}</option>
          {/each}
        </FloatingSelect>
      {:else if type === 'career'}
        <FloatingSelect name="budget" class="w-full" label="Position" bind:value={position}>
          {#each jobs as option}
            <option value={option}>{option}</option>
          {/each}
        </FloatingSelect>
      {/if}
    </div>
    <FloatingTextarea name="message" class="flex w-full" label="Message" bind:value={message} />
    {#if type !== 'contact'}
      <FileInput
        error={!!$page.form?.error?.messages.attachments}
        name="attachments"
        bind:element={fileInput}
        size="lg"
        class="w-full"
        multiple
        bind:files={attachments}
      />
      {#if attachments}
        <div>
          <p class="text-sm text-foreground-secondary">
            {#each attachments as file}
              <span>{file.name}</span>
              <span class="mr-0.5 text-foreground-tertiary">/</span>
            {/each}
            <TextButton
              class="text-sm text-foreground"
              on:click={() => {
                attachments = undefined;
                fileInput.value = '';
              }}>Clear all</TextButton
            >
          </p>
        </div>
      {/if}
    {/if}
  </div>
  {#if $page.form?.success}
    <div class="mt-4 text-success">Thank you for reaching out!</div>
  {/if}
  {#if $page.form?.error?.type === 'notion'}
    <div class="mt-4 text-error">
      Oops! We must've forgotten to feed our pidgeons. Please try again or contact us directly.
    </div>
  {/if}
  {#if $page.form?.error?.type === 'email'}
    <div class="mt-4 text-error">
      We couldn't deliver our confirmation e-mail! Did you mistype your e-mail address?
    </div>
  {/if}
  <div class="mt-8 flex items-center justify-between">
    <div>
      <p class="leading-none text-foreground-secondary">Hate contact forms?</p>
      <Link class="mt-1 inline-flex" href="mailto:hello@significa.co">hello@significa.co</Link>
    </div>
    <Button type="submit" size="lg" arrow {loading} disabled={loading}>Send message</Button>
  </div>
</form>
