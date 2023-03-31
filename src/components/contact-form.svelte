<script lang="ts">
  import { browser } from '$app/environment';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import {
    type FileUploadItem,
    Button,
    FileUpload,
    FloatingInput,
    FloatingSelect,
    FloatingTextarea,
    Link,
    Radio,
    toast
  } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import { createEventDispatcher } from 'svelte';

  type FormType = 'quote' | 'career' | 'contact';
  export let variant: undefined | FormType = undefined;

  let type: FormType = variant || 'quote';
  const options = [
    {
      type: 'quote',
      title: t('contact.type.quote.title'),
      subtitle: t('contact.type.quote.description')
    },
    {
      type: 'career',
      title: t('contact.type.position.title'),
      subtitle: t('contact.type.position.description')
    },
    {
      type: 'contact',
      title: t('contact.type.contact.title'),
      subtitle: t('contact.type.contact.description')
    }
  ];

  const DEFAULT_POSITION = t('contact.position.default');

  let files: FileUploadItem[] = [];
  export let name = '';
  export let email = '';
  export let budget = '';
  export let position = DEFAULT_POSITION;
  export let message = '';
  export let attachments = '';
  $: if (files.length > 0) {
    attachments = files
      .filter((f) => f.status === 'success')
      .map((f) => f.url)
      .join(',');
  }

  const dispatch = createEventDispatcher<{
    focus: string;
    blur: string;
    success: undefined;
    error: string;
  }>();

  const budgetOptions = ['10k - 25k', '25k - 50k', '50k - 100k', '100k+'];
  const careers = [
    DEFAULT_POSITION,
    ...($page.data.careers || []).map((j: ISbStoryData) => j.name)
  ];

  let loading = false;

  $: if ($page.form?.success) {
    dispatch('success');
    toast.success({
      message: t('contact.feedback.success.title'),
      description: t('contact.feedback.success.description'),
      timeout: 8000
    });
  }

  $: if ($page.form?.error) {
    dispatch('error', $page.form.error.type);

    if (browser) {
      if ($page.form?.error?.type === 'notion') {
        toast.error({
          message: t('contact.feedback.error.notion.title'),
          description: t('contact.feedback.error.notion.description'),
          timeout: 0
        });
      } else if ($page.form?.error?.type === 'email') {
        toast.error({
          message: t('contact.feedback.error.email.title'),
          description: t('contact.feedback.error.email.description'),
          timeout: 0
        });
      } else {
        toast.error({
          message: t('contact.feedback.error.title'),
          description: t('contact.feedback.error.description'),
          timeout: 0
        });
      }
    }
  }
</script>

{#if variant === undefined}
  <div class="mb-8 border-b pb-8">
    <p class="font-medium leading-none">{t('contact.type.title')}</p>
    <p class="mt-1 leading-none text-foreground-secondary">{t('contact.type.description')}</p>

    <div class="mt-8 flex flex-col gap-4 md:flex-row">
      {#each options as option}
        <label
          for={option.type}
          class="flex w-full items-center gap-3 rounded-md border p-4 transition-all hover:bg-foreground/2"
        >
          <Radio id={option.type} bind:group={type} value={option.type} />
          <div>
            <p class="font-medium leading-none">{option.title}</p>
            <p class="mt-1 leading-none text-foreground-secondary">{option.subtitle}</p>
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
      loading = false;
      files = [];

      await update();
    };
  }}
>
  <div class="flex flex-col gap-4">
    <div class="flex w-full flex-col gap-4 md:flex-row">
      <FloatingInput
        required
        error={!!$page.form?.error?.fields?.name}
        name="name"
        class="w-full"
        label={t('contact.label.name')}
        bind:value={name}
        on:focus={() => dispatch('focus', 'name')}
        on:blur={() => dispatch('blur', 'name')}
      />
      <FloatingInput
        required
        error={!!$page.form?.error?.fields?.email}
        name="email"
        type="email"
        class="w-full"
        label={t('contact.label.email')}
        bind:value={email}
        on:focus={() => dispatch('focus', 'email')}
        on:blur={() => dispatch('blur', 'email')}
      />
    </div>
    {#if type === 'quote'}
      <FloatingSelect
        name="budget"
        class="w-full"
        label={t('contact.label.budget')}
        bind:value={budget}
        on:focus={() => dispatch('focus', 'budget')}
        on:blur={() => dispatch('blur', 'budget')}
      >
        <option value="">Select budget</option>
        {#each budgetOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </FloatingSelect>
    {:else if type === 'career'}
      <FloatingSelect
        name="position"
        class="w-full"
        label={t('contact.label.position')}
        bind:value={position}
        on:focus={() => dispatch('focus', 'position')}
        on:blur={() => dispatch('blur', 'position')}
      >
        {#each careers as option}
          <option value={option}>{option}</option>
        {/each}
      </FloatingSelect>
    {/if}
    <FloatingTextarea
      required
      error={!!$page.form?.error?.fields?.message}
      name="message"
      class="flex w-full"
      label={t('contact.label.message')}
      rows={5}
      bind:value={message}
      on:focus={() => dispatch('focus', 'message')}
      on:blur={() => dispatch('blur', 'message')}
    />
    {#if type !== 'contact'}
      <FileUpload
        bind:files
        placeholder={type === 'quote'
          ? t('contact.label.attachment.quote')
          : t('contact.label.attachment.position')}
        size="lg"
        getSignedUrl={async (file) => {
          const res = await fetch(
            `/get-signed-url?${new URLSearchParams({
              name: file.name,
              type: file.type,
              size: file.size.toString()
            }).toString()}`
          );

          return res.text();
        }}
      />
      <input type="hidden" name="attachments" bind:value={attachments} />
    {/if}
  </div>
  <div class="mt-8 flex flex-col justify-between gap-4 sm:flex-row-reverse sm:items-center">
    <Button
      type="submit"
      size="lg"
      arrow
      {loading}
      disabled={loading || files.some((f) => f.status === 'uploading')}
      >{t('contact.submit')}</Button
    >
    <div class="text-sm">
      <p class="leading-none text-foreground-secondary">{t('contact.footer.title')}</p>
      <Link class="mt-0.5 inline-flex" href="mailto:{t('contact.footer.email')}"
        >{t('contact.footer.email')}</Link
      >
    </div>
  </div>
</form>
