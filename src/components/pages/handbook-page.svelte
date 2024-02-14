<script lang="ts">
  import placeholder from '$assets/handbook/handbook_placeholder.svg';
  import NotionBlockResolver from '$components/notion/notion-block-resolver.svelte';
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { t } from '$lib/i18n';
  import { formatDate } from '$lib/utils/dates.js';
  import { getPageDescription, getPageTitle } from '$lib/utils/notion.js';
  import { slugify } from '$lib/utils/paths.js';
  import type {
    BlockObjectResponse,
    PageObjectResponse
  } from '@notionhq/client/build/src/api-endpoints.js';
  import handbook from '$root/handbook.json';
  import { page } from '$app/stores';

  export let path: string;

  let handbookPage: Partial<PageObjectResponse & { children: Array<BlockObjectResponse> }>;

  $: handbookPage = handbook.find(
    (page) => path === slugify(getPageTitle(page as PageObjectResponse))
  ) as PageObjectResponse;
</script>

<Seo
  title={`${getPageTitle(handbookPage)} - Handbook by Significa`}
  description={getPageDescription(handbookPage)}
  image={`${$page.url.origin}/handbook/seo/${handbookPage.id}`}
/>

<div use:drawerLinks class="max-w-2xl mx-auto mt-10 lg:mt-20 rich-text">
  {#if handbookPage?.cover}
    <img
      src={`/handbook/covers/${handbookPage.id}`}
      alt="Page cover"
      class="w-full rounded-lg mb-10"
    />
  {:else}
    <img src={placeholder} alt="Page cover placeholder" class="w-full rounded-lg mb-10" />
  {/if}

  {#if handbookPage?.last_edited_time}
    <p class="text-sm text-foreground-secondary pt-0.5">
      <span>{t('handbook.last.updated')}</span>
      <span class="text-foreground-tertiary">·</span>
      <span class="text-foreground">{formatDate(new Date(handbookPage.last_edited_time))}</span>
    </p>
  {/if}

  <h1 class="[&:first-of-type]:mt-0">{getPageTitle(handbookPage)}</h1>

  {#if handbookPage?.children?.length}
    <NotionBlockResolver parent={handbookPage} />
  {/if}
</div>
