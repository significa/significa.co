<script lang="ts">
  import { page } from '$app/stores';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';
  import type { AssetStoryblok } from '$types/bloks';
  import { getContext } from 'svelte';

  export let title: undefined | string = undefined;
  export let description: undefined | string = undefined;
  export let image: undefined | AssetStoryblok | string = undefined;

  const inDrawer = getContext<boolean>('drawer');
</script>

<svelte:head>
  {#if !inDrawer}
    <title>{title || $page.data.page?.story?.content?.seo_title || t('seo.title')}</title>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@SignificaDotCo" />
    <script type="application/ld+json">
      {@html $page.data.page?.story?.content?.structure_data_markup}
    </script>
    <meta
      name="description"
      content={description ||
        $page.data.page?.story?.content?.seo_description ||
        t('seo.description')}
    />
    <meta
      property="og:title"
      content={title || $page.data.page?.story?.content?.seo_title || t('seo.title')}
    />
    <meta
      property="twitter:title"
      content={title || $page.data.page?.story?.content?.seo_title || t('seo.title')}
    />
    <meta
      property="og:description"
      content={description ||
        $page.data.page?.story?.content?.seo_description ||
        t('seo.description')}
    />
    <meta
      property="twitter:description"
      content={description ||
        $page.data.page?.story?.content?.seo_description ||
        t('seo.description')}
    />
    <meta property="og:url" content={$page.url.toString()} />
    <meta property="og:type" content="website" />
    {#if typeof image !== 'string' && image?.filename && !VIDEO_EXTENSIONS.includes(getFileExtension(image.filename))}
      {@const { src } = getImageAttributes(image, { size: [1200, 630] })}
      <meta property="og:image" content={src} />
      <meta property="twitter:image" content={src} />
    {:else if $page.data.page?.story?.content?.seo_og_image?.filename}
      {@const { src } = getImageAttributes($page.data.page?.story?.content?.seo_og_image, {
        size: [1200, 630]
      })}
      <meta property="og:image" content={src} />
      <meta property="twitter:image" content={src} />
    {:else if typeof image === 'string'}
      <meta property="og:image" content={image} />
      <meta property="twitter:image" content={image} />
    {:else}
      <meta property="og:image" content="{$page.url.origin}/og.png" />
      <meta property="twitter:image" content="{$page.url.origin}/og.png" />
    {/if}
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {/if}
</svelte:head>
