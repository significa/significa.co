<script lang="ts">
  import HoverableGallery from '$components/hoverable-gallery.svelte';
  import Seo from '$components/seo.svelte';
  import type { ContactsPageStoryblok } from '$types/bloks';
  import PanWithEggs from './contact/pan-with-eggs.svelte';
  import Segg1 from './contact/illustrations/segg1.svelte';
  import Segg2 from './contact/illustrations/segg2.svelte';
  import ContactForm from '$components/contact-form.svelte';

  export let data: ContactsPageStoryblok;
</script>

<Seo />
<main class="overflow-hidden">
  <div class="container relative mx-auto px-container">
    <section class="pb-5 pt-10 lg:pb-12 lg:pt-20 lg:text-center">
      <h1 class="mx-auto text-7xl lg:max-w-xl">
        {data.page_title1}<br /> <span class="text-foreground-secondary">{data.page_title2}</span>
      </h1>
    </section>

    <section class="mx-auto lg:max-w-xl lg:pt-5">
      <ContactForm variant="contact" disclaimer={data.form_support_text} />
    </section>

    <PanWithEggs class="absolute -left-16 top-4 hidden -rotate-[14deg] lg:block" />
    <Segg1 class="absolute -right-16 top-[207px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
    <Segg2 class="absolute -right-20 top-[440px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
  </div>

  {#if !!data.gallery?.length}
    <section class="border-b">
      <div class="container mx-auto px-container">
        <HoverableGallery cards={data.gallery} class="mt-12 lg:mt-0" />
      </div>
    </section>
  {/if}
</main>
