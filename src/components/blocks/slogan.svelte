<script lang="ts">
  import type { SloganStoryblok } from '$types/bloks';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: SloganStoryblok;
</script>

<div use:storyblokEditable={block} class="container mx-auto px-container md:mt-14 lg:mt-20">
  <div class="max-w-[1145px]">
    <h1 class="mt-10 text-7xl font-bold">
      {block.heading}
    </h1>

    <p class="font-bol text-7xl text-foreground-secondary">
      {block.subheading}
    </p>
  </div>
</div>
