<script lang="ts">
  import { formatDate } from '$lib/utils/dates';
  import type { BlogPostStoryblok, TeamMemberStoryblok } from '$types/bloks';
  import { Button, Link, Tag } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import Person from './person.svelte';
  import { TrackingEvent, track } from '$lib/track';
  import { page } from '$app/stores';
  import { drawer } from '$lib/stores/drawer';
  import { t } from '$lib/i18n';

  export let post: ISbStoryData<
    Omit<BlogPostStoryblok, 'author'> & {
      author: ISbStoryData<TeamMemberStoryblok>;
    }
  >;
</script>

<div
  class="border-b transition-colors elevated-links first:border-t hover:bg-foreground-tertiary/10"
>
  <div class="container mx-auto flex gap-6 px-container py-8 @container">
    <div class="hidden flex-1 @6xl:block">
      <Person
        name={post.content.author.name}
        position={post.content.author.content.position}
        photo={post.content.author.content?.photo}
      />
    </div>
    <div class="w-full max-w-2xl">
      <p class="mb-2 text-base font-medium text-foreground-secondary">
        {formatDate(new Date(post.first_published_at || post.published_at || post.created_at))}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        on:click={() => {
          track(TrackingEvent.BLOG_POST_CLICK, {
            props: {
              name: post.name,
              to: `/blog/${post.slug}`,
              path: $drawer || $page.url.pathname
            }
          });
        }}
        class="max-w-2xl text-4xl elevated-link">{post.name}</Link
      >
      {#if post.tag_list.length}
        <div class="mt-5 flex flex-wrap gap-2">
          {#each post.tag_list as tag}
            <Tag
              href="/blog?t={encodeURIComponent(tag)}"
              on:click={() => {
                track(TrackingEvent.BLOG_POST_TAG_CLICK, {
                  props: { name: tag, path: $drawer || $page.url.pathname }
                });
              }}
              label={tag}
            />
          {/each}
        </div>
      {/if}
    </div>
    <div class="hidden flex-1 justify-end xl:flex">
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
