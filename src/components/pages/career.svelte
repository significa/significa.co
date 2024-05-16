<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import RichText from '$components/rich-text.svelte';
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { richTextBlockWidths } from '$lib/constants';
  import type { CareerPage } from '$lib/content';

  export let story: CareerPage;
</script>

<Seo
  structureDataMarkup={story.content.structure_data_markup}
  title={story.content.seo_title || story.name}
/>
<div class="container mx-auto px-container">
  <h1 class="mx-auto mt-10 max-w-2xl text-5xl md:mt-14 lg:mt-20">{story.name}</h1>
  {#if story.content.body}
    <div class="mt-6 md:mt-8 lg:mt-10" use:drawerLinks>
      <RichText
        doc={story.content.body}
        getAttributes={(_, block) => ({
          class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
        })}
      />
    </div>
  {/if}
  <div class="mx-auto my-10 max-w-2xl border-t pt-10 md:my-14 md:pt-14 lg:my-20 lg:pt-20">
    <h4 class="text-lg font-medium leading-none">Sounds good?</h4>
    <p class="mb-6 text-lg font-medium text-foreground-secondary">Submit your application here</p>
    <ContactForm variant="career" position={story.name} />
  </div>
</div>
