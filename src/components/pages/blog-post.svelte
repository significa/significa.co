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
  <header class="max-w-2xl mx-auto mt-8 mb-10">
    {#if story.first_published_at}
      <p class="text-base text-foreground-secondary font-medium">
        {formatDate(new Date(story.first_published_at || story.published_at || story.created_at), {
          dateStyle: 'medium'
        })}
      </p>
    {/if}
    <h1 class="text-5xl">{story.name}</h1>
    {#if story.tag_list.length}
      <div class="flex flex-wrap gap-2 mt-5">
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
    <img class="max-w-6xl mx-auto rounded-md w-full h-auto" {src} {alt} {width} {height} />
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
    <div class="max-w-2xl mx-auto mb-6">
      <h4 class="text-xl font-medium">Related project</h4>
      <p class="text-lg text-foreground-secondary">
        For more details about {project.name}, check out the project page.
      </p>
    </div>
    <div
      class="max-w-2xl mx-auto bg-background-panel rounded-3xl flex overflow-hidden justify-between elevated-links"
    >
      <div class="p-6 flex flex-col items-start">
        <div class="flex-1">
          <h3 class="text-xl font-medium">{project.name}</h3>
          <p class="text-xl text-foreground-secondary">{project.content.tagline}</p>
        </div>
        <Button
          class="elevated-link mt-6"
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
    <div class="mt-10 md:mt-14 lg:mt-20 max-w-2xl mx-auto border-t border-border pt-8">
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
