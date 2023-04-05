<script lang="ts">
  import { page } from '$app/stores';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';
  import type { AssetStoryblok } from '$types/bloks';

  export let title: undefined | string = undefined;
  export let description: undefined | string = undefined;
  export let image: undefined | AssetStoryblok = undefined;

  $: console.log($page.url);
</script>

<svelte:head>
  <title>{title || $page.data.story?.content?.seo_title || t('seo.title')}</title>
  <meta
    name="description"
    content={description || $page.data.story?.content?.seo_description || t('seo.description')}
  />
  <meta
    property="og:title"
    content={title || $page.data.story?.content?.seo_title || t('seo.title')}
  />
  <meta
    property="og:description"
    content={description || $page.data.story?.content?.seo_description || t('seo.description')}
  />
  <meta property="og:url" content={$page.url.toString()} />
  <meta property="og:type" content="website" />
  {#if image?.filename && !VIDEO_EXTENSIONS.includes(getFileExtension(image.filename))}
    {@const { src } = getImageAttributes(image, { size: [1200, 630] })}
    <meta property="og:image" content={src} />
  {:else if $page.data.story?.content?.seo_image?.filename}
    {@const { src } = getImageAttributes($page.data.story?.content?.seo_image, {
      size: [1200, 630]
    })}
    <meta property="og:image" content={src} />
  {:else}
    <meta property="og:image" content="{$page.url.origin}/og.jpg" />
  {/if}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>
