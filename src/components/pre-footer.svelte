<script lang="ts">
  import { t } from '$lib/i18n';
  import type { ComponentProps } from 'svelte';
  import ContactForm from './contact-form.svelte';
  import PreFooterAsset from './illustrations/assets/pre-footer.webp';
  import PreFooterAssetLight from './illustrations/assets/pre-footer-light.webp';
  import { theme } from '$lib/stores/theme';

  export let variant: ComponentProps<ContactForm>['variant'] = undefined;
</script>

<section class="container mx-auto px-container @container">
  <div class="grid grid-cols-3 overflow-hidden rounded-lg border">
    <div class="col-span-1 hidden flex-col bg-background-panel @5xl:flex">
      <div class="p-8">
        <h3 class="text-4xl">
          {t('prefooter.title.line1')}<br />
          {t('prefooter.title.line2')}
        </h3>
        <p class="mt-4 text-xl text-foreground-secondary">
          {t('prefooter.description')}
        </p>
      </div>
      <div class="flex flex-1 flex-col justify-end">
        <img src={$theme === 'dark' ? PreFooterAsset : PreFooterAssetLight} alt="" />
      </div>
    </div>
    <div class="col-span-3 bg-background-panel p-4 pt-8 @5xl:p-8 @5xl:col-span-2 @5xl:border-l">
      <ContactForm {variant} />
    </div>
  </div>
</section>
