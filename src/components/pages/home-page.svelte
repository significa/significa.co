<script lang="ts">
  import ProjectEntry from '$components/project-entry.svelte';
  import Slogan from '$components/slogan.svelte';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getFileExtension } from '$lib/utils/strings';
  import type { HomePageStoryblok, PageStoryblok } from '$types/bloks';
  import SmallHighlights from './home/small-highlights.svelte';
  import Reel from '$components/reel.svelte';
  import clsx from 'clsx';
  import Seo from '$components/seo.svelte';
  import { afterNavigate } from '$app/navigation';
  import { getImageAttributes } from '$lib/utils/cms';

  import { drawerLinks } from '$lib/actions/drawer-links';
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  export let data: HomePageStoryblok;

  let show = false;

  afterNavigate(() => {
    if (window.scrollY > 500) {
      show = true;
    }
  });

  export let blocks: PageStoryblok['blocks'];
</script>

<!-- TODO: Remove this code since it's repeated on hero.svelte (block) as soon as we change the pages to blocks -->
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
    <section use:drawerLinks class="mt-10 mb-8 md:mt-14 lg:mt-20">
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
      />
    {/if}
  </div>
  <!-- -------- -->

  <!-- TODO: Remove this code since it's repeated on projects.svelte (block) as soon as we change the pages to blocks -->
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
  <!-- -------- -->

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</div>
