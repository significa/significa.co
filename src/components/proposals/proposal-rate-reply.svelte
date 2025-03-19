<script lang="ts">
  import { Button } from '@significa/svelte-ui';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import ProposalsAsset from '$components/illustrations/assets/proposals.webp';
</script>

<section class="container mx-auto my-20 px-container lg:my-28">
  <div
    data-theme="dark"
    class="flex flex-col justify-between rounded-lg border bg-background text-foreground lg:flex-row"
  >
    <img
      class="mx-6 flex lg:hidden"
      src={ProposalsAsset}
      alt="stickers showing the differences facets of our services"
    />
    <div class="p-6 pt-0 md:w-1/2 lg:p-12 2xl:w-1/3">
      <div>
        <h3 class="text-2xl text-white lg:text-4xl">{t('proposals.reply.description')}</h3>
      </div>
      <Button as="a" href={`${$page.url.pathname}/accept`} class="mt-8 bg-white text-black"
        >{t('proposals.nav.action.long')}</Button
      >
    </div>
    <div
      class="hidden flex-1 justify-end bg-contain bg-center bg-no-repeat lg:block"
      style="background-image: url({ProposalsAsset});"
    />
  </div>
</section>
