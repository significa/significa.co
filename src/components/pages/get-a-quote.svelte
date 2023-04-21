<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import Form from './get-a-quote/form.svelte';
  import Images from '../images.svelte';
  import Steps from './get-a-quote/steps.svelte';
  import Timezone from './get-a-quote/timezone.svelte';

  export let page: GetAQuotePageStoryblok;
</script>

<Seo />
<Form {page} />
<Timezone {page} />
<Steps {page} />
<Images {page} />
