<script lang="ts">
  import { formatDate } from '$lib/utils/dates';
  import type { WordPressBlogPost } from '$lib/types/wordpress';
  import { Button, Link, Tag } from '@significa/svelte-ui';
  import Person from './person.svelte';
  import { t } from '$lib/i18n';
  import { twMerge } from 'tailwind-merge';

  export let post: WordPressBlogPost;

  // Extract tags from WordPress embedded data
  $: tags = (() => {
    if (!post._embedded?.['wp:term']) return [];
    const tagTerms: string[] = [];
    post._embedded['wp:term'].forEach((termArray: any[]) => {
      termArray.forEach((term: any) => {
        if (term.taxonomy === 'post_tag') {
          tagTerms.push(term.name);
        }
      });
    });
    return tagTerms;
  })();

  // Extract authors from WordPress
  $: authors = post.acf?.authors || [];
  $: externalAuthors = post.acf?.external_authors || [];
</script>

<div
  class="border-b transition-colors elevated-links first:border-t hover:bg-foreground-tertiary/10"
>
  <div class="container mx-auto flex gap-6 px-container py-8 @container">
    <div class={twMerge('hidden flex-1 @6xl:flex @6xl:h-fit  @6xl:flex-col  @6xl:gap-6')}>
      {#if authors?.length}
        {#each authors as author}
          <Person
            isActive={author.is_active}
            name={author.name}
            position={author.position}
            photo={author.photo}
          />
        {/each}
      {/if}
      {#if externalAuthors?.length}
        {#each externalAuthors as externalAuthor}
          <Person
            isActive={externalAuthor.is_active}
            name={externalAuthor.name}
            position={externalAuthor.position}
            photo={externalAuthor.photo}
          />
        {/each}
      {/if}
    </div>
    <div class="w-full max-w-xl">
      <div class="flex gap-2">
        <p class="mb-2 text-base font-medium text-foreground-secondary">
          {formatDate(new Date(post.date))}
        </p>
        {#if post.acf?.reading_time}
          <p class="text-base text-foreground-secondary/80">•</p>
          <p class="text-base text-foreground-secondary/80">
            {`${post.acf.reading_time} min read`}
          </p>
        {/if}
      </div>

      <Link href={`/blog/${post.slug}`} class="max-w-2xl text-4xl elevated-link">
        {post.title?.rendered || ''}
      </Link>
      {#if tags.length}
        <div class="mt-5 flex flex-wrap gap-2">
          {#each tags as tag}
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
