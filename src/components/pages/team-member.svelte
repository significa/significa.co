<script lang="ts">
  import BlogEntry from '$components/blog-entry.svelte';
  import DashedEgg from '$components/dashed-egg.svelte';
  import DottedEgg from '$components/dotted-egg.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import Seo from '$components/seo.svelte';
  import type { BlogPostPage, ProjectPage } from '$lib/content';
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { TeamMemberStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import clsx from 'clsx';

  export let story: ISbStoryData<TeamMemberStoryblok>;
  export let posts: BlogPostPage[];
  export let projects: ProjectPage[];

  let tab: 'posts' | 'projects' = projects.length ? 'projects' : 'posts';
  let buttons = [
    {
      title: t('member.projects.title'),
      subtitle: t('member.projects.subtitle'),
      tab: 'projects',
      active: !!projects.length
    },
    {
      title: t('member.posts.title'),
      subtitle: t('member.posts.subtitle'),
      tab: 'posts',
      active: !!posts.length
    }
  ] as const;
</script>

<Seo
  title={story.content.seo_title || story.name}
  description={story.content.seo_description || story.content.bio}
/>

<div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
  <div>
    <h1 class="text-6xl">
      {story.name}
    </h1>
    <p class="text-6xl text-foreground-secondary">
      {!story.content.is_active ? `${t('team.former')} ` : ''}{story.content.position}
    </p>
  </div>
</div>

<div class="container mx-auto px-container @container">
  <div class="mt-6 flex flex-col items-start justify-between gap-8 @4xl:flex-row">
    <p class="text-2xl @4xl:max-w-xl">{story.content.bio}</p>
    <div class="flex gap-4">
      <DottedEgg class="hidden @md:block" />
      <DashedEgg class="hidden @sm:block" />
      {#if story.content.photo?.filename}
        {@const { src } = getImageAttributes(story.content.photo, { size: [160 * 2, 192 * 2] })}
        <div
          style="background-image: url({src}); width: 160px; height: 192px; clip-path: path('M160 107.664C160 154.241 124.183 192 80 192C35.8172 192 0 154.241 0 107.664C0 61.0858 35.8172 0 80 0C124.183 0 160 61.0858 160 107.664Z')"
          class="bg-background-offset bg-cover bg-center bg-no-repeat"
        />
      {/if}
    </div>
  </div>
</div>

<div class="container mx-auto px-container">
  <div class="mt-10 flex gap-10 text-2xl font-medium @container md:mt-14 lg:mt-20">
    {#each buttons as button}
      {#if button.active}
        <button
          class={clsx(
            'pb-4 text-left transition-all hover:opacity-100',
            tab === button.tab
              ? 'border-b border-foreground opacity-100'
              : 'border-b border-transparent opacity-50'
          )}
          on:click={() => (tab = button.tab)}
        >
          <p>{button.title}</p>
          <p class="hidden text-foreground-secondary @md:block">{button.subtitle}</p>
        </button>
      {/if}
    {/each}
  </div>
</div>

<div>
  {#if projects.length && tab === 'projects'}
    <div>
      {#each projects as project}
        <ProjectEntry {project} />
      {/each}
    </div>
  {/if}

  {#if posts.length && tab === 'posts'}
    <div>
      {#each posts as post}
        <BlogEntry {post} />
      {/each}
    </div>
  {/if}
</div>
