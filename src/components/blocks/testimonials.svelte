<script lang="ts">
  import type { TestimonialsStoryblok } from '$types/bloks';
  import Testimonials from '$components/testimonials.svelte';

  export let block: TestimonialsStoryblok;
</script>

<Testimonials
  firstTitle={block.testimonials_title1}
  secondTitle={block.testimonials_title2}
  testimonials={block.testimonials}
  ctaLabel={block.testimonials_cta_label}
  ctaLink={block.testimonials_cta_link}
/>
