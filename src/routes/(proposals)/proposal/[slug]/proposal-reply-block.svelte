<script lang="ts">
  import { Button } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';
  import { formatter } from '$lib/utils/currency';

  export let type: string;
</script>

<section class="container mx-auto px-container mt-20 lg:mt-28">
  {#if type === 'package'}
    <h1 class="border rounded-t-lg text-xl font-semibold p-6">Estimated cost & duration</h1>

    <div class="grid grid-flow-col p-6 border-l border-r">
      <div>
        <p>Total people</p>
        <p>4</p>
      </div>

      <div>
        <p>Estimated manpower</p>
        <p>8 months</p>
      </div>

      <div>
        <p>Estimated duration</p>
        <p>4 months</p>
      </div>

      <div>
        <p>Monthly Cost</p>
        <p>{formatter.format(27500)}</p>
      </div>

      <div class="justify-self-end">
        <p>Estimated total</p>
        <p>{formatter.format(108000)}</p>
      </div>
    </div>

    <div class="bg-black flex items-center justify-between rounded-b-lg p-6">
      <h3 class="text-xl text-white">{t('proposals.reply.description')}</h3>
      <!-- FIXME: this button should do something-->
      <Button class="bg-white text-black">{t('proposals.nav.action.long')}</Button>
    </div>
  {:else}
    <div class="bg-black flex items-start justify-between rounded-lg">
      <div class="md:w-1/2 2xl:w-1/3 p-12">
        <div>
          <h3 class="text-4xl text-white">{t('proposals.reply.description')}</h3>
        </div>
        <!-- FIXME: this button should do something-->
        <Button class="mt-10 bg-white text-black">{t('proposals.nav.action.long')}</Button>
      </div>
      <!-- FIXME: Add physics illustrations -->
    </div>
  {/if}
</section>
