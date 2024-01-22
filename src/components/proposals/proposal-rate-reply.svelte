<script lang="ts">
  import { Button } from '@significa/svelte-ui';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import ProposalsAsset from '$components/illustrations/assets/proposals.webp';
</script>

<section class="container mx-auto px-container my-20 lg:my-28">
  <div
    data-theme="dark"
    class="border bg-background text-foreground flex flex-col lg:flex-row justify-between rounded-lg"
  >
    <img
      class="flex lg:hidden mx-6"
      src={ProposalsAsset}
      alt="stickers showing the differences facets of our services"
    />
    <div class="md:w-1/2 2xl:w-1/3 p-6 pt-0 lg:p-12">
      <div>
        <h3 class="text-2xl lg:text-4xl text-white">{t('proposals.reply.description')}</h3>
      </div>
      <Button as="a" href={`${$page.url.pathname}/accept`} class="mt-8 bg-white text-black"
        >{t('proposals.nav.action.long')}</Button
      >
    </div>
    <div
      class="hidden lg:block flex-1 justify-end bg-no-repeat bg-center bg-contain"
      style="background-image: url({ProposalsAsset});"
    />
  </div>
</section>
