<script lang="ts">
  import { formatDate } from '$lib/utils/dates';
  import type { BlogPostStoryblok, TeamMemberStoryblok } from '$types/bloks';
  import { Icon, Link, Tag } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import Person from './person.svelte';

  export let post: ISbStoryData<
    Omit<BlogPostStoryblok, 'author'> & {
      author: ISbStoryData<TeamMemberStoryblok>;
    }
  >;
</script>

<div class="grid grid-cols-8 border-b border-border py-8 elevated-links first:border-t">
  <div class="col-span-3 hidden lg:block xl:col-span-2">
    <Person
      name={post.content.author.name}
      position={post.content.author.content.position}
      photo={post.content.author.content.photo}
    />
  </div>
  <div class="col-span-8 lg:col-span-5 xl:col-span-4">
    <p class="mb-2 text-base font-medium text-foreground-secondary">
      {formatDate(new Date(post.first_published_at || post.published_at || post.created_at))}
    </p>
    <Link href={`/blog/${post.slug}`} class="max-w-2xl text-4xl elevated-link">{post.name}</Link>
    {#if post.tag_list.length}
      <div class="mt-5 flex flex-wrap gap-2">
        {#each post.tag_list as tag}
          <Tag href="/blog?t={encodeURIComponent(tag)}" label={tag} />
        {/each}
      </div>
    {/if}
  </div>
  <div class="col-span-2 hidden justify-end text-foreground-tertiary xl:flex">
    <Icon icon="arrow-right" />
  </div>
</div>
