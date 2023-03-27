<script lang="ts">
  import { t } from '$lib/i18n';
  import type { ComponentProps } from 'svelte';
  import ContactForm from './contact-form.svelte';
  import TwoEggs from './illustrations/two-eggs.svelte';

  export let variant: ComponentProps<ContactForm>['variant'] = undefined;
</script>

<section class="container mt-10 mb-40">
  <div class="grid grid-cols-3 overflow-hidden rounded-lg border border-border">
    <div class="col-span-1 hidden flex-col bg-background-panel p-8 xl:flex">
      <h3 class="text-4xl">
        {t('prefooter.title.line1')}<br />
        {t('prefooter.title.line2')}
      </h3>
      <p class="mt-4 text-lg leading-tight">
        {t('prefooter.description')}
      </p>
      <div class="flex flex-1 flex-col justify-end text-drawing">
        <TwoEggs class="w-64" />
      </div>
    </div>
    <div class="col-span-3 bg-background-panel p-8 xl:col-span-2 xl:border-l xl:border-border">
      <ContactForm {variant} />
    </div>
  </div>
</section>
