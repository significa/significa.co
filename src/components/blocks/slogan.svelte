<script lang="ts">
  import type { SloganStoryblok } from '$types/bloks';
  import Slogan from '$components/slogan.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: SloganStoryblok;
</script>

<div use:storyblokEditable={block} class="container mx-auto px-container">
  <Slogan
    {block}
    variant="big"
    animate
    as="h1"
    class="mt-10 text-7xl font-bold md:mt-14 lg:mt-20"
  />
</div>
