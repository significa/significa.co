<script lang="ts">
  import { formatDate } from '$lib/utils/dates';
  import type { BlogPostStoryblok, TeamMemberStoryblok } from '$types/bloks';
  import { Button, Link, Tag } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import Person from './person.svelte';
  import { t } from '$lib/i18n';
  import { twMerge } from 'tailwind-merge';

  export let post: ISbStoryData<
    Omit<BlogPostStoryblok, 'author'> & {
      author?: ISbStoryData<TeamMemberStoryblok>;
    }
  >;
</script>

<div
  class="border-b transition-colors elevated-links first:border-t hover:bg-foreground-tertiary/10"
>
  <div class="container mx-auto flex gap-6 px-container py-8 @container">
    <div
      class={twMerge(
        'hidden flex-1 @6xl:grid @6xl:grid-rows-2 @6xl:grid-flow-col @6xl:gap-6 @6xl:h-fit',
        post.content.authors?.length > 2 && '@6xl:grid-cols-2'
      )}
    >
      {#if post.content.authors?.length}
        {#each post.content.authors as author}
          <Person
            isActive={author.content.is_active}
            name={author.name}
            position={author.content.position}
            photo={author.content?.photo}
          />
        {/each}
      {/if}
    </div>
    <div class="w-full max-w-xl">
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
    <div class="hidden flex-1 justify-end xl:flex xl:max-w-xs">
      <Button
        as="a"
        variant="secondary"
        arrow
        size="sm"
        href={`/blog/${post.slug}`}
        aria-label={t('a11y.see-post')}
      />
    </div>
  </div>
</div>
