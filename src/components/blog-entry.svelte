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

<div class="elevated-links py-8 grid grid-cols-8 first:border-t border-b border-border">
  <div class="hidden lg:block col-span-3 xl:col-span-2">
    <Person
      name={post.content.author.name}
      position={post.content.author.content.position}
      photo={post.content.author.content.photo}
    />
  </div>
  <div class="col-span-8 lg:col-span-5 xl:col-span-4">
    <p class="text-base text-foreground-secondary font-medium mb-2">
      {formatDate(new Date(post.first_published_at || post.published_at || post.created_at))}
    </p>
    <Link href={`/blog/${post.slug}`} class="elevated-link text-4xl max-w-2xl">{post.name}</Link>
    {#if post.tag_list.length}
      <div class="flex flex-wrap gap-2 mt-5">
        {#each post.tag_list as tag}
          <Tag href="/blog?t={encodeURIComponent(tag)}" label={tag} />
        {/each}
      </div>
    {/if}
  </div>
  <div class="hidden xl:flex col-span-2 justify-end text-foreground-tertiary">
    <Icon icon="arrow-right" />
  </div>
</div>
