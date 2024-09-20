<script lang="ts" context="module">
  export const formTypes = ['quote', 'career', 'contact', 'estimations'] as const;
  export type FormType = (typeof formTypes)[number];
  export const isFormType = (type: string): type is FormType =>
    formTypes.some((formType) => formType === type);
</script>

<script lang="ts">
  import { browser } from '$app/environment';
  import { applyAction, enhance } from '$app/forms';
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
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import { budgetRange } from './pages/get-a-quote/budgetRange';

  export let variant: undefined | FormType = undefined;
  export let disclaimer: string | undefined = undefined;

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
  } else {
    attachments = '';
  }

  const dispatch = createEventDispatcher<{
    focus: string;
    blur: string;
    success: undefined;
    error: string;
    input: string;
  }>();

  const budgetOptions = budgetRange;

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
  <div class="mb-8 border-b pb-8 @container">
    <p class="font-medium leading-none">{t('contact.type.title')}</p>
    <p class="mt-1 leading-none text-foreground-secondary">{t('contact.type.description')}</p>

    <div class="mt-8 flex flex-col @2xl:flex-row @2xl:gap-4">
      {#each options as option}
        <label
          for={option.type}
          class={clsx(
            'flex w-full items-center gap-3 p-4 transition-all hover:bg-foreground/2',
            'border first:rounded-t-md last:rounded-b-md [&+&]:border-t-0',
            '@2xl:rounded-md @2xl:border @2xl:border-b-border @2xl:[&+&]:border-t'
          )}
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
  action={{
    quote: '/form/quote',
    career: '/form/career',
    contact: '/form/contact',
    estimations: '/form/estimations'
  }[type]}
  use:enhance={(form) => {
    loading = true;

    // let our form handler know that we're using progressive enhancement
    form.data.append('submitted-using-progressive-enhancement', 'true');

    return async ({ update, result }) => {
      loading = false;
      files = [];

      await applyAction(result);
      await update();
    };
  }}
>
  <slot name="estimationsform" />
  <input type="hidden" name="return-to" value={$page.url.pathname} />
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
        on:input={() => dispatch('input', 'name')}
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
        on:input={() => dispatch('input', 'email')}
      />
    </div>
    {#if type === 'career'}
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
      on:input={() => dispatch('input', 'message')}
    />
    {#if type === 'quote' && budgetOptions}
      <FloatingSelect
        required
        name="budget"
        class="w-full"
        label={t('contact.label.budget')}
        bind:value={budget}
        on:focus={() => dispatch('focus', 'budget')}
        on:blur={() => dispatch('blur', 'budget')}
        on:change={() => dispatch('input', 'budget')}
      >
        <option value="" class="text-foreground">Select budget</option>
        {#each budgetOptions as option}
          <option value={option} class="text-foreground">{option}</option>
        {/each}
      </FloatingSelect>
    {/if}
    {#if type !== 'contact'}
      <FileUpload
        bind:files
        on:focus={() => dispatch('focus', 'attachments')}
        on:blur={() => dispatch('blur', 'attachments')}
        on:change={() => dispatch('input', 'attachments')}
        on:error={() =>
          toast.error({
            message: t('file.upload.error.title'),
            description: t('file.upload.error.description')
          })}
        placeholder={type === 'quote' || type === 'estimations'
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
    {#if disclaimer}
      <p class="text-base text-foreground-secondary my-3">{disclaimer}</p>
      <hr />
    {/if}
  </div>
  <div class="mt-8 pb-1 flex flex-col justify-between gap-6 sm:flex-row-reverse sm:items-center">
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
