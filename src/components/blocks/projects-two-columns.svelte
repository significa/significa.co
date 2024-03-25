<script lang="ts">
  import ProjectTwoColumnsEntry from '$components/project-two-columns-entry.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsTwoColumnsStoryblok } from '$types/bloks';

  export let block: ProjectsTwoColumnsStoryblok;

  import triangle from '$assets/triangle-measurement.svg';
  import RichTextTestimonial from './rich-text-testimonial.svelte';
  import { getImageAttributes } from '$lib/utils/cms';
  import { Button } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';
</script>

<section use:storyblokEditable={block} class="mt-10 lg:mt-12 md:border-y">
  <div class="hidden container mx-auto px-container md:grid grid-cols-1 md:grid-cols-[50%_50%]">
    {#each block.project || [] as project}
      {@const projectItem = project.project}
      <div class={'md:first:pr-8 md:first:border-r md:last:pl-8'}>
        <ProjectTwoColumnsEntry project={projectItem} />
      </div>
    {/each}
  </div>
  <div class="hidden border-t md:flex">
    <div class=" container mx-auto px-container grid grid-cols-1 md:grid-cols-[50%_50%]">
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
  <div class="hidden border-t md:flex">
    <div class=" container mx-auto px-container grid grid-cols-1 md:grid-cols-[50%_50%]">
      {#each block.project || [] as testimonials}
        <div class="flex first:pr-8 first:border-r last:pl-8 py-6">
          {#each testimonials.testimonial || [] as testimonial}
            <RichTextTestimonial class="max-w-[470px]" variant="default" block={testimonial} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <div class="hidden md:flex border-t py-3">
    <div class="container mx-auto px-container flex justify-center">
      <p class="text-base text-foreground-secondary font-medium">{block.note}</p>
    </div>
  </div>

  <div class="container mx-auto px-container md:hidden">
    {#each block.project || [] as project}
      {@const projectItem = project.project}
      {#if projectItem.content.thumbnail.length}
        {#if projectItem.content.thumbnail[0]?.filename}
          {@const { src, alt, width, height } = getImageAttributes(
            projectItem.content.thumbnail[0],
            {
              size: [540 * 2]
            }
          )}
          <div class="rounded-lg bg-background-panel p-3 first:mb-4">
            <div class="flex pb-8">
              <img
                class="h-20 w-full rounded-md bg-background-offset object-cover max-w-[102px]"
                {src}
                {alt}
                {width}
                {height}
              />
              <div class="flex flex-col pl-3">
                <p class="text-lg font-semibold text-foreground-secondary">{projectItem.name}</p>
                <p class="text-lg font-semibold">{projectItem.content.tagline}</p>
              </div>
            </div>
            <div class="flex mb-8">
              {#each project.measurements || [] as measurements}
                <div class="flex flex-col mr-3 w-14">
                  <p class="text-xs text-foreground-secondary font-medium uppercase">
                    {measurements.title}
                  </p>
                  <div class="flex">
                    <p class="text-lg font-semibold">{measurements.value}%</p>
                    <img class="max-h-2.5 mt-2 ml-1.5" src={triangle} alt={measurements.title} />
                  </div>
                </div>
              {/each}
            </div>
            <div class="flex flex-col mb-8">
              {#each project.testimonial || [] as testimonial}
                <span class="text-base font-semibold mb-2"
                  >&ldquo;{testimonial.testimonial}&rdquo;</span
                >
                <div class="flex">
                  <p class="text-sm font-semibold">{testimonial.name}</p>
                  <p class="text-sm font-semibold text-foreground-secondary ml-1">
                    {testimonial.position}
                  </p>
                </div>
              {/each}
            </div>
            <Button as="a" href={`/projects/${projectItem.slug}`} variant="secondary" arrow
              >{t('view-project')}</Button
            >
          </div>
        {/if}
      {/if}
    {/each}
    <div class="flex mx-auto text-center max-w-72 mt-4">
      <p class="text-xs text-foreground-secondary font-medium">{block.note}</p>
    </div>
  </div>
</section>