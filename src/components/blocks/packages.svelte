<script lang="ts">
  import type { PackagesStoryblok } from '$types/bloks';

  import Form from '$components/pages/get-a-quote/form.svelte';
  import HandAsset from '../illustrations/assets/hand.webp';

  export let block: PackagesStoryblok;
</script>

<section class="border-t mt-20">
  <div
    class="container mx-auto px-container @container flex flex-col items-center text-center max-w-md"
  >
    <img width="122" src={HandAsset} alt="" class="-mt-14" />
    <h3 class="text-5xl font-semibold text-foreground-secondary">{block.section_title}</h3>
    <h3 class="text-5xl font-semibold">{block.section_description}</h3>
  </div>
</section>
<Form page={block} />
