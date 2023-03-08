<script lang="ts">
  import { richTextBlockWidths } from '$lib/constants';
  import RichText from '$components/rich-text.svelte';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { Avatar, Icon, Link } from '@significa/svelte-ui';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { t } from '$lib/i18n';
  import type { ProjectPage } from '$lib/storyblok';

  export let story: ProjectPage;
</script>

<div use:drawerLinks class="container">
  <header class="pb-6">
    {#if story.content.cover?.filename}
      {@const { alt, src, width, height } = getImageAttributes(story.content.cover, {
        size: [1440, 0]
      })}
      <img class="h-auto w-full rounded-md bg-background-offset" {src} {alt} {width} {height} />
    {/if}

    <div class="mx-auto mt-8 mb-8 max-w-2xl md:mt-14 lg:mt-20">
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

  {#if story.content.recognitions?.length}
    <div class="mx-auto max-w-2xl border-y border-border py-8">
      <h4 class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">
        {t('recognitions')}
      </h4>
      <div class="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3">
        {#each story.content.recognitions as recognition}
          <div class="col-span-1 flex items-center">
            {#if recognition.image.filename}
              {@const { alt, src, width, height } = getImageAttributes(recognition.image, {
                size: [120, 0]
              })}
              <img
                class="mr-2 h-auto w-14 rounded-md bg-background-offset"
                {src}
                {alt}
                {width}
                {height}
              />
            {/if}
            <div>
              <h4 class="text-xs uppercase tracking-wider text-foreground-secondary">
                {recognition.label}
              </h4>
              <p class="text-sm font-medium">{recognition.title}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="mx-auto mt-8 mb-8 grid max-w-2xl grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3">
    {#each [{ title: t('services'), data: story.content.services }, { title: t('deliverables'), data: story.content.deliverables }, { title: t('links'), data: story.content.links }] as { title, data }}
      {#if data}
        <ul class="col-span-1">
          <h4 class="mb-2 text-xs uppercase tracking-wider text-foreground-secondary">{title}</h4>
          {#if Array.isArray(data)}
            <!-- Links -->
            {#each data as link}
              {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
              <li class="flex items-center gap-1">
                <Link {href} {target} {rel}>{link.label}</Link>
                <Icon class="mt-0.5" icon="arrow-right" />
              </li>
            {/each}
          {:else}
            <!-- Textareas -->
            {#each data.split('\n') as line}
              <li>
                <p class="mb-2 text-base">{line}</p>
              </li>
            {/each}
          {/if}
        </ul>
      {/if}
    {/each}
  </div>

  {#if story.content.team?.length}
    <div class="mx-auto max-w-2xl border-y border-border py-8">
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
