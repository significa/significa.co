<script lang="ts">
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import Slogan from '$components/slogan.svelte';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import type { BlogPostPage } from '$lib/content';
  import { getFileExtension } from '$lib/utils/strings';
  import type { HomePageStoryblok } from '$types/bloks';
  import SmallHighlights from './home/small-highlights.svelte';

  export let page: HomePageStoryblok;
  export let posts: BlogPostPage[] | undefined;
</script>

<div class="container mx-auto px-container">
  <Slogan as="h1" class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20" />
  <section class="mt-10 md:mt-14 lg:mt-20">
    <SmallHighlights highlights={page.small_highlights} />
  </section>
  {#if page.showreel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(page.showreel.filename))}
    <section>
      <video
        class="mt-8 aspect-video h-auto w-full rounded-md bg-background-offset"
        muted
        playsinline
        autoplay
        loop
        src={page.showreel.filename}
      />
    </section>
  {/if}
</div>

<section class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto px-container">
    <h3 class="text-4xl text-foreground-secondary">{page.work_title}</h3>
  </div>
  <div class="mt-4 md:mt-6 lg:mt-8">
    {#each page.projects || [] as project}
      <ProjectEntry {project} />
    {/each}
  </div>
</section>

<section class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto px-container">
    <h3 class="text-4xl text-foreground-secondary">{page.blog_title1}</h3>
    <p class="text-4xl">{page.blog_title2}</p>
  </div>
  <div class="mt-4 md:mt-6 lg:mt-8">
    {#each posts || [] as post}
      <BlogEntry {post} />
    {/each}
  </div>
</section>
