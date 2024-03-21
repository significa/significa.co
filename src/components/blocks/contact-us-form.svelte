<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import Segg1 from '$components/pages/contact/illustrations/segg1.svelte';
  import Segg2 from '$components/pages/contact/illustrations/segg2.svelte';
  import PanWithEggs from '$components/pages/contact/pan-with-eggs.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ContactUsFormStoryblok } from '$types/bloks';

  export let block: ContactUsFormStoryblok;
</script>

<div use:storyblokEditable={block} class="overflow-hidden">
  <div class="container relative mx-auto px-container">
    <section class="pb-5 pt-10 lg:pb-12 lg:pt-20 lg:text-center">
      <h1 class="mx-auto text-7xl text-foreground-secondary lg:max-w-xl">
        {block.title1}
      </h1>
      <span class="mx-auto text-7xl lg:max-w-xl">{block.title2}</span>
    </section>

    <section class="mx-auto lg:max-w-xl lg:pt-5">
      <ContactForm variant="contact" disclaimer={block.form_support_text} />
    </section>

    <PanWithEggs class="absolute -left-16 top-4 hidden -rotate-[14deg] drop-shadow-md lg:block" />
    <Segg1 class="absolute -right-16 top-[170px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
    <Segg2 class="absolute -right-20 top-[400px] hidden -rotate-[16deg] drop-shadow-md lg:block" />
  </div>
</div>
