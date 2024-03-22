<script lang="ts">
  import ProjectTwoColumnsEntry from '$components/project-two-columns-entry.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsTwoColumnsStoryblok } from '$types/bloks';

  export let block: ProjectsTwoColumnsStoryblok;

  import triangle from '$assets/triangle-measurement.svg';
  import RichTextTestimonial from './rich-text-testimonial.svelte';
  import { device } from '$lib/stores/device';
</script>

<section use:storyblokEditable={block} class="mt-4 md:mt-6 lg:mt-12 border-y">
  {#if $device !== 'touch'}
    <div class="container mx-auto px-container grid grid-cols-1 md:grid-cols-[50%_50%]">
      {#each block.project || [] as project}
        {@const projectItem = project.project}
        <div class={'md:first:pr-8 md:first:border-r md:last:pl-8'}>
          <ProjectTwoColumnsEntry project={projectItem} />
        </div>
      {/each}
    </div>
    <div class="border-t">
      <div class="container mx-auto px-container grid grid-cols-1 md:grid-cols-[50%_50%]">
        {#each block.project || [] as measurement}
          <div class="flex first:pr-8 first:border-r last:pl-8 py-6">
            {#each measurement.measurements || [] as measurements}
              <div class="flex flex-col mr-3 w-24">
                <p class="text-xs text-foreground-secondary font-medium uppercase">
                  {measurements.title}
                </p>
                <div class="flex">
                  <p class="text-3xl font-semibold">{measurements.value}%</p>
                  <img class="max-h-2.5 mt-2 ml-1.5" src={triangle} alt={measurements.title} />
                </div>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="border-t">
      <div class="container mx-auto px-container grid grid-cols-1 md:grid-cols-[50%_50%]">
        {#each block.project || [] as testimonials}
          <div class="flex first:pr-8 first:border-r last:pl-8 py-6">
            {#each testimonials.testimonial || [] as testimonial}
              <RichTextTestimonial class="max-w-[470px]" variant="default" block={testimonial} />
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="border-t py-3">
      <div class="container mx-auto px-container flex justify-center">
        <p class="text-base text-foreground-secondary font-medium">{block.note}</p>
      </div>
    </div>
  {:else}
    <div class="container mx-auto px-container">
      <div class=" rounded-lg border bg-background"></div>
    </div>
  {/if}
</section>
