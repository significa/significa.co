<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import Reel from '$components/reel.svelte';

  import Slogan from '$components/slogan.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';

  import type { HeroStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: HeroStoryblok;

  let show = false;

  afterNavigate(() => {
    if (window.scrollY > 500) {
      show = true;
    }
  });
</script>

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
      <SmallHighlights highlights={block.small_highlights} />
    </section>
    {#if block.showreel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(block.showreel.filename))}
      <Reel
        src={block.showreel.filename}
        playLabel={block.showreel_button_label}
        preview={block.showreel_cover?.filename
          ? getImageAttributes(block.showreel_cover).src
          : undefined}
        buttonTheme={block.showreel_button_theme}
      />
    {/if}
  </div>
</div>
