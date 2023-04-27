<script lang="ts">
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import { t } from '$lib/i18n';
  import { Button, FloatingInput, FloatingTextarea, Link } from '@significa/svelte-ui';
  import HoverableGallery from '$components/hoverable-gallery.svelte';
  import Seo from '$components/seo.svelte';
  import type { ContactsPageStoryblok } from '$types/bloks';
  import PanWithEggs from './contact/pan-with-eggs.svelte';
  import Segg1 from './contact/illustrations/segg1.svelte';
  import Segg2 from './contact/illustrations/segg2.svelte';

  export let data: ContactsPageStoryblok;

  let name = '';
  let email = '';
  let message = '';
  let loading = false;
</script>

<Seo />
<main class="overflow-hidden">
  <div class="container relative mx-auto px-container">
    <section class="pb-12 pt-20 text-center">
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

    <PanWithEggs class="absolute -left-16 top-4 -rotate-[14deg]" />
    <Segg1 class="absolute -right-16 top-[207px] -rotate-[16deg] drop-shadow-md" />
    <Segg2 class="absolute -right-20 top-[440px] -rotate-[16deg] drop-shadow-md" />
  </div>

  {#if !!data.gallery?.length}
    <section class="border-b">
      <section class="container mx-auto px-container">
        <HoverableGallery cards={data.gallery} />
      </section>
    </section>
  {/if}
</main>
