<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import Form from './get-a-quote/form.svelte';
  import Images from '../images.svelte';
  import Timezone from './get-a-quote/timezone.svelte';
  import Steps from '$components/blocks/steps.svelte';

  export let page: GetAQuotePageStoryblok;
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
<Images images={page.images} class="py-12 md:py-20 lg:py-32" />
