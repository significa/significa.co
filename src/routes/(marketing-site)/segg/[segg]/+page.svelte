<script lang="ts">
  import DrawYourSegg from '$components/draw-your-segg/draw-your-segg.svelte';
  import { t } from '$lib/i18n';
  import { Button } from '@significa/svelte-ui';

  export let data;
</script>

<div class="container mx-auto flex items-center justify-center px-container pt-4 md:mt-6 lg:mt-10">
  <DrawYourSegg template={data.drawing} />
</div>

<div class="container mx-auto mb-10 mt-10 px-container md:mt-14 md:text-center lg:mt-20">
  <h2 class="text-4xl">{t('draw-segg.title')}</h2>
  <p class="mt-2 max-w-md text-lg/tight text-foreground-secondary md:mx-auto">
    {t('draw-segg.description')}
  </p>
  <Button class="mt-6" as="a" href="/careers">{t('draw-segg.cta')}</Button>
</div>
