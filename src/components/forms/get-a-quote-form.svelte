<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import {
    FileInput,
    FloatingInput,
    FloatingSelect,
    FloatingTextarea,
    TextButton
  } from '@significa/svelte-ui';
  import FormFooter from './form-footer.svelte';

  let name = '';
  let email = '';
  let budget = '';
  let message = '';
  let attachments: FileList | undefined = undefined;

  let fileInput: HTMLInputElement;

  const budgetOptions = ['10k - 25k', '25k - 50k', '50k - 100k', '100k+'];

  let loading = false;
</script>

<form
  id="get-a-quote-form"
  method="POST"
  action="?/get-a-quote#get-a-quote-form"
  use:enhance={() => {
    loading = true;

    return async ({ update }) => {
      update();
      loading = false;
      attachments = undefined;
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
      <FloatingSelect name="budget" class="w-full" label="Budget range" bind:value={budget}>
        <option value="">Select budget</option>
        {#each budgetOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </FloatingSelect>
    </div>
    <FloatingTextarea name="message" class="flex w-full" label="Message" bind:value={message} />
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
  <FormFooter {loading} />
</form>
