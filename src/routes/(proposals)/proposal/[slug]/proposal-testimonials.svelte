<script lang="ts">
  import Testimonials from '$components/testimonials.svelte';
  import { t } from '$lib/i18n';
  import type { RichtextTestimonialStoryblok } from '$types/bloks';

  export let testimonials: RichtextTestimonialStoryblok[];
</script>

{#if testimonials?.length > 0}
  <section class=" pt-20 lg:pt-28">
    <div class="container mx-auto flex px-container">
      <div class="xl:max-w-3xl lg:w-1/3">
        <h2 class="text-4xl">{t('proposals.testimonials')}.</h2>
        <p class="text-4xl text-foreground-secondary">
          {t('proposals.testimonials.description')}
        </p>
      </div>
    </div>
    <Testimonials variant="one" firstTitle={''} secondTitle={''} {testimonials} hasBorder={false} />
  </section>
{/if}
