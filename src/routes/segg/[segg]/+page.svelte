<script lang="ts">
  import DrawYourSegg from '$components/draw-your-segg/draw-your-segg.svelte';
  import { t } from '$lib/i18n';
  import { Button } from '@significa/svelte-ui';

  export let data;
</script>

<div class="flex items-center justify-center pt-10">
  <DrawYourSegg template={data.drawing} />
</div>

<div class="mb-10 mt-20 text-center">
  <h2 class="text-4xl">{t('draw-segg.title')}</h2>
  <p class="mx-auto mt-2 max-w-md text-lg/tight text-foreground-secondary">
    {t('draw-segg.description')}
  </p>
  <Button class="mt-6" as="a" href="/careers">{t('draw-segg.cta')}</Button>
</div>
