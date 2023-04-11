<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import Seo from '$components/seo.svelte';
  import { richTextBlockWidths } from '$lib/constants';
  import type { ISbRichtext } from '@storyblok/js';

  export let body: ISbRichtext;
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
