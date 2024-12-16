<script lang="ts">
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
    <h3 class="text-5xl font-semibold text-foreground-secondary">{block.section_title}</h3>
    <h3 class="text-5xl font-semibold">{block.section_description}</h3>
  </div>
</section>
<Form page={block} />
