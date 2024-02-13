<script lang="ts">
  import placeholder from '$assets/handbook_placeholder.svg';
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

  export let path: string;

  let page: Partial<PageObjectResponse & { children: Array<BlockObjectResponse> }>;

  $: page = handbook.find(
    (page) => path === slugify(getPageTitle(page as PageObjectResponse))
  ) as PageObjectResponse;
</script>

<Seo
  title={`${getPageTitle(page)} - Handbook by Significa`}
  description={getPageDescription(page)}
/>

<div use:drawerLinks class="max-w-2xl mx-auto mt-10 lg:mt-20 rich-text">
  {#if page?.cover}
    <img src={`/handbook/covers/${page.id}`} alt="Page cover" class="w-full rounded-lg mb-10" />
  {:else}
    <img src={placeholder} alt="Page cover placeholder" class="w-full rounded-lg mb-10" />
  {/if}

  {#if page?.last_edited_time}
    <p class="text-sm text-foreground-secondary pt-0.5">
      <span>{t('handbook.last.updated')}</span>
      <span class="text-foreground-tertiary">·</span>
      <span class="text-foreground">{formatDate(new Date(page.last_edited_time))}</span>
    </p>
  {/if}

  <h1 class="[&:first-of-type]:mt-0">{getPageTitle(page)}</h1>

  {#if page?.children?.length}
    <NotionBlockResolver parent={page} />
  {/if}
</div>
