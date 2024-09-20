<script lang="ts">
  import placeholder from '$assets/handbook/handbook_placeholder.svg';
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { t } from '$lib/i18n';
  import { formatDate } from '$lib/utils/dates.js';

  import type { HandbookPage } from '$lib/content';
  import { getImageAttributes } from '$lib/utils/cms';
  import RichText from '$components/rich-text.svelte';
  import { richTextBlockWidths } from '$lib/constants';

  export let story: HandbookPage;
</script>

{#key story.full_slug}
  <Seo
    title={story.content.seo_title || `${story.name} - Handbook by Significa`}
    description={story.content.seo_description}
    image={story.content.seo_og_image}
    structureDataMarkup={story.content.structure_data_markup}
  />
  <div use:drawerLinks class="mx-auto px-container container">
    <div class="max-w-2xl mx-auto mt-10 lg:mt-20 rich-text mb-20">
      {#if story.content.cover.filename}
        {@const { src, alt } = getImageAttributes(story.content.cover, { size: [1024, 0] })}
        <img {src} {alt} class="w-full rounded-lg mb-10" />
      {:else}
        <img src={placeholder} alt="Page cover placeholder" class="w-full rounded-lg mb-10" />
      {/if}

      {#if story.content.last_updated}
        <p class="text-sm text-foreground-secondary pt-0.5">
          <span>{t('handbook.last.updated')}</span>
          <span class="text-foreground-tertiary">·</span>
          <span class="text-foreground">{formatDate(new Date(story.content.last_updated))}</span>
        </p>
      {/if}

      <h1 class="[&:first-of-type]:mt-0">{story.name}</h1>
    </div>

    {#if story.content.body}
      <RichText
        class="my-10 md:my-14 lg:my-20"
        doc={story.content.body}
        getAttributes={(_, block) => ({
          class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
        })}
      />
    {/if}
  </div>
{/key}
