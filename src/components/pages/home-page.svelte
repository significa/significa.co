<script lang="ts">
  import BlogEntry from '$components/blog-entry.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import Slogan from '$components/slogan.svelte';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import type { BlogPostPage } from '$lib/content';
  import { getFileExtension } from '$lib/utils/strings';
  import type { HomePageStoryblok } from '$types/bloks';
  import SmallHighlights from './home/small-highlights.svelte';
  import Reel from '$components/reel.svelte';
  import clsx from 'clsx';
  import HomeAbout from './home/home-about.svelte';
  import { page } from '$app/stores';
  import { Button } from '@significa/svelte-ui';
  import Seo from '$components/seo.svelte';
  import { afterNavigate } from '$app/navigation';
  import Testimonials from '$components/testimonials.svelte';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import Services from './home/services.svelte';
  import { TrackingEvent, track } from '$lib/track';

  export let data: HomePageStoryblok;
  export let posts: BlogPostPage[] | undefined;

  let show = false;

  afterNavigate(() => {
    if (window.scrollY > 500) {
      show = true;
    }
  });
</script>

<Seo />
<div class="container mx-auto px-container">
  <Slogan
    animate
    on:end={() => (show = true)}
    as="h1"
    class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20"
  />
</div>

<div
  class={clsx(
    'transition-all duration-700 ease-motion',
    show ? 'opacity-1 translate-y-0' : 'translate-y-10 opacity-0'
  )}
>
  <div class="container mx-auto px-container">
    <section class="mt-10 md:mt-14 lg:mt-20">
      <SmallHighlights highlights={data.small_highlights} />
    </section>
    {#if data.showreel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(data.showreel.filename))}
      <Reel
        src={data.showreel.filename}
        playLabel={data.showreel_button_label}
        preview={data.showreel_cover?.filename
          ? getImageAttributes(data.showreel_cover).src
          : undefined}
        buttonTheme={data.showreel_button_theme}
        trackEvent={{ event: TrackingEvent.HOME_REEL }}
      />
    {/if}
  </div>

  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto px-container">
      <h2 class="text-5xl">{data.work_title}</h2>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8">
      {#each data.projects || [] as project}
        <ProjectEntry {project} />
      {/each}
    </div>
  </section>

  <Services {data} />

  <Testimonials
    variant="two"
    firstTitle={data.testimonials_title1}
    secondTitle={data.testimonials_title2}
    testimonials={data.testimonials}
    ctaLabel={data.testimonials_cta_label}
    ctaLink={data.testimonials_cta_link}
  />

  <section class="mt-16 border-y lg:mt-20">
    <HomeAbout {data} />
  </section>

  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto px-container">
      <h2 class="text-5xl text-foreground-secondary">{data.blog_title1}</h2>
      <p class="text-5xl">{data.blog_title2}</p>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8">
      {#each posts || [] as post}
        <BlogEntry {post} />
      {/each}
    </div>
  </section>

  {#if $page.data.careers.length}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto justify-between gap-12 px-container lg:flex">
        <div class="flex flex-1 flex-col items-start">
          <div class="w-full flex-1">
            <h2 class="text-5xl">{data.careers_title}</h2>
            <ul class="mt-10">
              {#each $page.data.careers as career}
                <li class="border-b first:border-t">
                  <a
                    class="flex w-full items-center justify-between py-4 text-xl transition-colors hover:text-foreground-secondary"
                    href={career.full_slug}
                    on:click={() => {
                      track(TrackingEvent.CAREER_CLICK, {
                        props: { name: career.name, to: career.full_slug, path: $page.url.pathname }
                      });
                    }}
                  >
                    <span>{career.name}</span>
                    <Button class="pointer-events-none" variant="secondary" arrow size="sm" />
                  </a>
                </li>
              {/each}
            </ul>
          </div>
          <Button
            as="a"
            href="/careers"
            on:click={() => {
              track(TrackingEvent.CTA_CLICK, {
                props: { to: '/careers', path: $page.url.pathname, section: data.careers_title }
              });
            }}
            class="mt-10"
            variant="secondary"
            arrow>{data.careers_button_label}</Button
          >
        </div>
        <aside
          data-theme="yellow"
          class="mt-10 flex flex-col items-start justify-between rounded-lg p-8 lg:mt-0 lg:min-h-[500px] lg:max-w-md"
        >
          <div class="flex-1">
            <h3 class="text-4xl">{data.handbook_title}</h3>
            <p class="mt-4 text-xl text-foreground-secondary">{data.handbook_description}</p>
          </div>
          {#if data.handbook_cta_text && data.handbook_cta_link}
            {@const { href } = getAnchorFromCmsLink(data.handbook_cta_link)}
            <Button
              variant="secondary"
              as="a"
              {href}
              on:click={() => {
                track(TrackingEvent.CTA_CLICK, {
                  props: { to: href, path: $page.url.pathname, section: data.careers_title }
                });
              }}
              class="mt-10"
              icon="handbook"
              arrow
            >
              {data.handbook_cta_text}
            </Button>
          {/if}
        </aside>
      </div>
    </section>
  {/if}
</div>
