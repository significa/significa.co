<script lang="ts">
  import Heading from '$components/heading.svelte';
  import type { PackagesStoryblok } from '$types/bloks';

  import Form from '$components/pages/get-a-quote/form.svelte';
  import HandAsset from '../illustrations/assets/hand.webp';

  export let block: PackagesStoryblok;
</script>

<section class="mt-20 border-t">
  <div
    class="container mx-auto flex max-w-md flex-col items-center px-container text-center @container"
  >
    <img width="122" src={HandAsset} alt="" class="-mt-14" />
    <Heading offset={0} visual={3} class="text-5xl font-semibold text-foreground-secondary"
      >{block.section_title}</Heading
    >
    <Heading offset={0} visual={3} class="text-5xl font-semibold"
      >{block.section_description}</Heading
    >
  </div>
</section>
<Form page={block} />
