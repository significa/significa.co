<script lang="ts">
  import { page } from '$app/stores';
  import { Button, FloatingInput, FloatingTextarea, Link } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';
  import Seo from '$components/seo.svelte';
  import type { ContactsPageStoryblok } from '$types/bloks';
  import { enhance } from '$app/forms';

  export let data: ContactsPageStoryblok;

  let name = '';
  let email = '';
  let message = '';
  let loading = false;
</script>

<Seo />
<main>
  <section class="container mx-auto px-container pb-12 pt-20 text-center">
    <h1 class="mx-auto max-w-xl text-7xl">{data.page_title1}</h1>
    <p class="mx-auto max-w-xl text-7xl text-foreground-secondary">{data.page_title2}</p>
  </section>

  <section class="container mx-auto px-container">
    <form
      id="contact-form"
      method="POST"
      action="?/contact"
      class="mx-auto max-w-xl pt-5"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          loading = false;
          await update();
        };
      }}
    >
      <div class="border-b [&>*]:mb-6 [&>*]:w-full">
        <FloatingInput
          error={!!$page.form?.error?.fields?.email}
          name="email"
          label={t('contact.label.email')}
          bind:value={email}
        />
        <FloatingInput
          error={!!$page.form?.error?.fields?.name}
          name="name"
          label={t('contact.label.name')}
          bind:value={name}
        />
        <FloatingTextarea
          error={!!$page.form?.error?.fields?.message}
          name="message"
          class="flex"
          label={t('contact.label.message')}
          rows={5}
          bind:value={message}
        />
        <p class="text-base text-foreground-secondary">{data.form_support_text}</p>
      </div>

      <div class="mt-8 flex flex-col justify-between gap-4 sm:flex-row-reverse sm:items-center">
        <Button type="submit" size="lg" arrow {loading} disabled={loading}>
          {t('contact.submit')}
        </Button>
        <div class="text-sm">
          <p class="leading-none text-foreground-secondary">{t('contact.footer.title')}</p>
          <Link class="mt-0.5 inline-flex" href="mailto:{t('contact.footer.email')}">
            {t('contact.footer.email')}
          </Link>
        </div>
      </div>
    </form>
  </section>
</main>
