<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { GetAQuotePageStoryblok, PageStoryblok } from '$types/bloks';
  import Form from './get-a-quote/form.svelte';
  import Timezone from './get-a-quote/timezone.svelte';
  import Steps from '$components/blocks/steps.svelte';
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  export let page: GetAQuotePageStoryblok;

  export let blocks: PageStoryblok['blocks'];
</script>

<Seo />
<Form {page} />
<Timezone {page} />
<Steps
  block={{
    _uid: 'GetAQuoteSteps',
    component: 'steps',
    steps: page.steps,
    steps_subtitle: page.steps_subtitle,
    steps_title: page.title
  }}
/>

<main>
  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
