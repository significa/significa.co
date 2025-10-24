<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import Seo from '$components/seo.svelte';
  import { richTextBlockWidths } from '$lib/constants';

  // WordPress content can be a string or an object with rendered property
  export let body: string | { rendered: string };
</script>

<Seo />
<div class="container mx-auto px-container">
  <RichText
    class="my-10 md:my-14 lg:my-20"
    doc={body}
    getAttributes={(_, block) => ({
      class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
    })}
  />
</div>
