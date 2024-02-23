<script lang="ts">
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import Seo from '$components/seo.svelte';
  import type { BlogPostPage, ProjectPage } from '$lib/content';
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { TeamButtonsStoryblok, TeamMemberStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import clsx from 'clsx';
  import { theme } from '$lib/stores/theme';
  import { Button } from '@significa/svelte-ui';

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

  const handleLinkType = (
    linkType: TeamButtonsStoryblok['link_type'],
    link?: string,
    emailSubject?: string
  ) => {
    switch (linkType) {
      case 'email':
        return `mailto:${link}?subject=${emailSubject}`;
      case 'phone':
        return `tel:${link}`;
      case 'url':
        return `${link}`;
      default:
        return '';
    }
  };
</script>

<Seo
  title={story.content.seo_title || story.name}
  description={story.content.seo_description || story.content.bio}
  image={story.content.seo_og_image || story.content.cover_image_light}
/>

<div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
  <h1 class="text-6xl">
    {story.name}
  </h1>
</div>

<div class="container mx-auto px-container @container">
  <div class="flex flex-col items-start justify-between gap-8 @4xl:flex-row @4xl:gap-16">
    <div class="flex-[0_0_50%]">
      <p class="text-6xl text-foreground-secondary">
        {!story.content.is_active ? `${t('team.former')} ` : ''}{story.content.position}
      </p>
      <p class="mt-6 text-2xl @4xl:max-w-xl">{story.content.bio}</p>
      {#if story.content.buttons}
        <div class="flex mt-8 gap-4 flex-wrap">
          {#each story.content.buttons as item}
            <Button
              variant="secondary"
              as="a"
              href={`${handleLinkType(item.link_type, item.link, item.email_subject)}`}
              size="lg"
              class={clsx('w-fit [&:last-of-type]:flex [&:last-of-type]:@4xl:hidden')}
              >{item.title}</Button
            >
          {/each}
        </div>
      {/if}
    </div>
    {#if story.content.cover_image_light && story.content.cover_image_dark && story.content.is_active}
      {@const img =
        $theme === 'light' ? story.content.cover_image_light : story.content.cover_image_dark}
      {@const { src, alt } = getImageAttributes(img, { size: [720 * 2, 0] })}
      <div>
        <img {src} {alt} class="block flex-[0_0_50%] object-contain" />
      </div>
    {/if}
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
          on:click={() => {
            tab = button.tab;
          }}
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
