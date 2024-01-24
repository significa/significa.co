<script lang="ts">
  import { Button } from '@significa/svelte-ui';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { t } from '$lib/i18n';

  export let linkHref: string | undefined;
  export let image: AssetStoryblok | undefined;
  export let label: string | undefined;
  export let year: string | undefined;
  export let name: string | undefined;
  export let project: string | undefined;
</script>

<div class="flex w-full flex-col-reverse items-center lg:flex-row">
  <div class="mb-4 flex w-full items-center lg:mb-0">
    {#if image?.filename}
      {@const { alt, src, width, height } = getImageAttributes(image, {
        size: [120, 0]
      })}
      <img class="mr-2 h-auto w-14 rounded-xs bg-background-offset" {src} {alt} {width} {height} />
    {/if}
    <div class="ml-4 flex-col">
      <p class="text-base font-semibold text-foreground-secondary">
        {label}
      </p>
      <p class="text-base font-semibold">{name} {year}</p>
    </div>
  </div>
  <div class="mb-4 w-full lg:mb-0">
    <p class="text-3xl font-semibold">{project}</p>
  </div>
</div>
<div class="w-1/3">
  {#if linkHref}
    <div class="flex-1 justify-end text-foreground-tertiary xl:flex">
      <Button variant="secondary" arrow>
        {t('view-project')}
      </Button>
    </div>
  {/if}
</div>
