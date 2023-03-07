<script lang="ts">
  import { richTextBlockWidths } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import type { BlogPostStoryblok, ProjectStoryblok, TeamMemberStoryblok } from '$types/bloks';
  import { Button, Tag } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import RichText from '$components/rich-text.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import Person from '$components/person.svelte';

  export let story: ISbStoryData<
    Omit<BlogPostStoryblok, 'author' | 'project'> & {
      author: ISbStoryData<TeamMemberStoryblok>;
      project: ISbStoryData<ProjectStoryblok>;
    }
  >;
</script>

<div use:drawerLinks class="container">
  <header class="mx-auto mt-8 mb-10 max-w-2xl">
    {#if story.first_published_at}
      <p class="text-base font-medium text-foreground-secondary">
        {formatDate(new Date(story.first_published_at || story.published_at || story.created_at), {
          dateStyle: 'medium'
        })}
      </p>
    {/if}
    <h1 class="text-5xl">{story.name}</h1>
    {#if story.tag_list.length}
      <div class="mt-5 flex flex-wrap gap-2">
        {#each story.tag_list as tag}
          <Tag href="/blog?t={encodeURIComponent(tag)}" label={tag} />
        {/each}
      </div>
    {/if}
    {#if story.content.intro}
      <p class="mt-9 text-2xl font-medium">{story.content.intro}</p>
    {/if}
  </header>
  {#if story.content.cover?.filename}
    {@const { alt, src, width, height } = getImageAttributes(story.content.cover, {
      size: [1440, 0]
    })}
    <img class="mx-auto h-auto w-full max-w-6xl rounded-md" {src} {alt} {width} {height} />
  {/if}
  {#if story.content.body}
    <RichText
      class="my-10 md:my-14 lg:my-20"
      doc={story.content.body}
      getAttributes={(_, block) => ({
        class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
      })}
    />
  {/if}

  <!-- Project -->
  {#if story.content.project.id}
    {@const project = story.content.project}
    <div class="mx-auto mb-6 max-w-2xl">
      <h4 class="text-xl font-medium">Related project</h4>
      <p class="text-lg text-foreground-secondary">
        For more details about {project.name}, check out the project page.
      </p>
    </div>
    <div
      class="mx-auto flex max-w-2xl justify-between overflow-hidden rounded-3xl bg-background-panel elevated-links"
    >
      <div class="flex flex-col items-start p-6">
        <div class="flex-1">
          <h3 class="text-xl font-medium">{project.name}</h3>
          <p class="text-xl text-foreground-secondary">{project.content.tagline}</p>
        </div>
        <Button
          class="mt-6 elevated-link"
          variant="secondary"
          as="a"
          href={`/projects/${project.slug}`}
          arrow
        >
          See project
        </Button>
      </div>
      {#if project.content.thumbnail[0]?.filename}
        {@const { alt, src, width, height } = getImageAttributes(project.content.thumbnail[0], {
          size: [400, 0]
        })}
        <img class="w-1/3 flex-shrink-0 object-cover object-center" {src} {alt} {width} {height} />
      {/if}
    </div>
  {/if}

  <!-- Author -->
  {#if story.content.author.id}
    {@const author = story.content.author}
    <div class="mx-auto mt-10 max-w-2xl border-t border-border pt-8 md:mt-14 lg:mt-20">
      <Person name={author.name} position={author.content.position} photo={author.content.photo} />
      <p class="mt-6 text-xl text-foreground-secondary">{author.content.bio}</p>
      <Button
        variant="secondary"
        as="a"
        href={`/about/${author.slug}`}
        class="mt-6"
        arrow
        icon="document"
      >
        Author page
      </Button>
    </div>
  {/if}
</div>
