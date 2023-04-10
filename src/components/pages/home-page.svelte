<script lang="ts">
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import Slogan from '$components/slogan.svelte';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import type { BlogPostPage } from '$lib/content';
  import { getFileExtension } from '$lib/utils/strings';
  import type { HomePageStoryblok } from '$types/bloks';
  import SmallHighlights from './home/small-highlights.svelte';
  import Reel from './home/reel.svelte';
  import clsx from 'clsx';
  import { dev } from '$app/environment';
  import HomeAbout from './home/home-about.svelte';
  import { getImageAttributes } from '$lib/utils/cms';
  import Person from '$components/person.svelte';

  export let page: HomePageStoryblok;
  export let posts: BlogPostPage[] | undefined;

  let show = false;
</script>

<div class="container mx-auto px-container">
  <Slogan
    bypassAnimation={dev}
    on:end={() => (show = true)}
    as="h1"
    class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20"
  />
</div>

<div
  class={clsx(
    'transition-all delay-200 duration-700 ease-motion',
    show || dev ? 'opacity-1 translate-y-0' : 'translate-y-10 opacity-0'
  )}
>
  <div class="container mx-auto px-container">
    <section class="mt-10 md:mt-14 lg:mt-20">
      <SmallHighlights highlights={page.small_highlights} />
    </section>
    {#if page.showreel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(page.showreel.filename))}
      <Reel src={page.showreel.filename} />
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

  <section class="border-b">
    <HomeAbout {page} />
  </section>

  <section class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
    <h3 class="text-4xl text-foreground-secondary">{page.testimonials_title1}</h3>
    <p class="text-4xl">{page.testimonials_title2}</p>

    <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {#if page.testimonials_image?.filename}
        {@const { src, alt } = getImageAttributes(page.testimonials_image, { size: [1200, 0] })}
        <img class="w-full rounded-lg md:col-span-2" {src} {alt} />
      {/if}
      {#each page.testimonials || [] as testimonial}
        <div class="flex flex-col rounded-lg border p-6">
          <div class="flex-1">
            <span class="text-4xl text-foreground-tertiary">&ldquo;</span>
            <p class="text-2xl/tight font-medium">{testimonial.testimonial}</p>
          </div>
          <Person
            class="mt-8"
            name={testimonial.name}
            position={testimonial.position}
            photo={testimonial.photo}
          />
        </div>
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
</div>
