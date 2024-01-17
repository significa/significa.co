<script lang="ts">
  import { Button } from '@significa/svelte-ui';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
</script>

<section class="container mx-auto px-container mt-20 lg:mt-28">
  <div class="bg-black flex items-start justify-between rounded-lg">
    <div class="md:w-1/2 2xl:w-1/3 p-12">
      <div>
        <h3 class="text-4xl text-white">{t('proposals.reply.description')}</h3>
      </div>
      <Button as="a" href={`${$page.url.pathname}/accept`} class="mt-10 bg-white text-black"
        >{t('proposals.nav.action.long')}</Button
      >
    </div>
    <!-- FIXME: Add physics illustrations -->
  </div>
</section>
