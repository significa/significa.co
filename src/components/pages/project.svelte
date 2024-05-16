<script lang="ts">
  import { richTextBlockWidths, VIDEO_EXTENSIONS } from '$lib/constants';
  import RichText from '$components/rich-text.svelte';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { Avatar, Icon, Link } from '@significa/svelte-ui';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { t } from '$lib/i18n';
  import Recognitions from '$components/recognitions.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import PreFooter from '$components/pre-footer.svelte';
  import { getFileExtension } from '$lib/utils/strings';
  import Seo from '$components/seo.svelte';
  import Reel from '$components/reel.svelte';
  import type { ProjectPage } from '$lib/content';
  import { page } from '$app/stores';
  import Popover from '$components/proposals/popover.svelte';

  export let story: ProjectPage;
  export let related: ProjectPage[];
  $: next = related[related.findIndex((p) => p.id === story.id) + 1] || related[0];

  $: recognitions = $page.data.awards.filter((aw) => aw.content.project.id === story.id);
</script>

<Seo
  title={story.content.seo_title || story.content.tagline}
  description={story.content.seo_description || story.content.intro}
  image={story.content.seo_og_image || story.content.cover}
  structureDataMarkup={story.content.structure_data_markup}
/>
<div use:drawerLinks class="container mx-auto px-container">
  <header>
    {#if story.content.reel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(story.content.reel.filename))}
      <Reel
        src={story.content.reel.filename}
        playLabel={story.content.reel_button_label || t('reel.play')}
        preview={story.content.cover?.filename
          ? getImageAttributes(story.content.cover).src
          : undefined}
        buttonTheme={story.content.reel_button_theme}
      />
    {:else if story.content.cover?.filename}
      {@const { alt, src, width, height } = getImageAttributes(story.content.cover, {
        size: [1440, 0]
      })}
      <img class="h-auto w-full rounded-md bg-background-offset" {src} {alt} {width} {height} />
    {/if}

    <div class="mx-auto mt-8 max-w-2xl border-b pb-12 md:mt-14 lg:mt-20">
      <h1 class="text-5xl text-foreground-secondary">{story.name}</h1>
      <h2 class="text-5xl">{story.content.tagline}</h2>
      {#if story.first_published_at}
        <p class="mt-4 text-base font-medium text-foreground-secondary">
          {t('project.published-in', {
            year: new Date(story.first_published_at).getFullYear().toString()
          })}
        </p>
      {/if}
    </div>
  </header>

  {#if recognitions?.length}
    <div class="mx-auto mt-8 max-w-2xl border-b pb-8">
      <h4 class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">
        {t('recognitions')}
      </h4>
      <div class="grid grid-cols-1 gap-4 xs:gap-6 xs:grid-cols-2 md:grid-cols-3">
        <Recognitions {recognitions} />
      </div>
    </div>
  {/if}

  <div
    class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 border-b pb-6 xs:grid-cols-2 md:grid-cols-3"
  >
    {#each [{ title: t('services'), data: story.content.services }, { title: t('deliverables'), data: story.content.deliverables }, { title: t('links'), data: story.content.links }] as { title, data }}
      {#if data}
        <ul class="col-span-1">
          <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">{title}</h4>

          <!-- Links -->
          {#each data as line}
            {#if typeof line === 'object'}
              {@const { href, target, rel } = getAnchorFromCmsLink(line.link)}
              {#if href}
                <li class="mb-2 flex items-center gap-1">
                  <Link {href} {target} {rel}>{line.label}</Link>
                  <Icon class="mt-0.5" icon="arrow-external" />
                </li>
              {/if}
            {:else}
              <li>
                <p class="mb-2 text-base">{line}</p>
              </li>
            {/if}
          {/each}
        </ul>
      {/if}
    {/each}
  </div>

  {#if story.content.team?.length}
    <div class="mx-auto mt-8 max-w-2xl border-b pb-8">
      <h4 class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">
        {t('project.team')}
      </h4>
      <div class="flex flex-wrap gap-2">
        {#each story.content.team as member}
          {#if member.content?.photo?.filename}
            <a href={`/about/${member.slug}`}>
              <Avatar
                image={getImageAttributes(member.content.photo, {
                  size: [100, 100]
                }).src}
                size="sm"
              />
              <span class="sr-only">{member.name}</span>
            </a>
          {/if}
        {/each}
      </div>
    </div>
  {/if}

  {#if story.content.measurements && story.content.measurements.length > 0}
    <div class="flex border-b mx-auto max-w-2xl py-6 gap-6 gap-y-3 md:gap-8 md:gap-y-4 flex-wrap">
      {#each story.content.measurements || [] as measurements}
        <div class="flex flex-col whitespace-nowrap">
          <Popover variant={'fit-content'}>
            <div slot="target">
              <p class="text-xs font-medium uppercase">
                {measurements.title}
              </p>
              <div class="flex items-center gap-1.5">
                {#if measurements.icon}
                  {@const { alt, src } = getImageAttributes(measurements.icon)}
                  <img class="max-h-1.5" {src} {alt} />
                {/if}
                <p class="md:text-2xl text-lg font-semibold">{measurements.value}</p>
              </div>
            </div>
            <div slot="popover">
              <p class="text-sm whitespace-nowrap">{measurements.popover}</p>
            </div>
          </Popover>
        </div>
      {/each}
    </div>
  {/if}

  {#if story.content.intro}
    <p class="mx-auto my-10 max-w-2xl text-3xl font-medium md:my-14 lg:my-20">
      {story.content.intro}
    </p>
  {/if}

  {#if story.content.body}
    <RichText
      class="my-20"
      doc={story.content.body}
      getAttributes={(_, block) => ({
        class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
      })}
    />
  {/if}
</div>

<!-- Prefooter -->
<!-- TODO: Remove this code since it's repeated on prefooter-form (block) as soon as we change this page to blocks -->
<div class="mb-12 mt-40">
  <PreFooter />
</div>

{#if next}
  <div>
    <ProjectEntry project={next} />
  </div>
{/if}
