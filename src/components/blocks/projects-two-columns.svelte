<script lang="ts">
  import ProjectTwoColumnsEntry from '$components/project-two-columns-entry.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsTwoColumnsStoryblok } from '$types/bloks';

  export let block: ProjectsTwoColumnsStoryblok;

  import RichTextTestimonial from './rich-text-testimonial.svelte';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { Button } from '@significa/svelte-ui';
  import Popover from '$components/proposals/popover.svelte';
</script>

<section use:storyblokEditable={block} class="mt-10 md:border-y lg:mt-12">
  <div class="container mx-auto hidden grid-cols-1 px-container md:grid md:grid-cols-[50%_50%]">
    {#each block.project || [] as project}
      <div class={'md:first:border-r md:first:pr-8 md:last:pl-8'}>
        <ProjectTwoColumnsEntry {project} />
      </div>
    {/each}
  </div>
  {#if block.project && block.project[0].measurements && block.project[1].measurements}
    <div class="hidden border-t md:flex">
      <div class="container mx-auto grid grid-cols-1 px-container md:grid-cols-[50%_50%]">
        {#each block.project || [] as measurement}
          <div class="flex flex-wrap gap-8 gap-y-4 py-6 first:border-r first:pr-8 last:pl-8">
            {#each measurement.measurements || [] as measurements}
              <div class="flex flex-col whitespace-nowrap">
                <Popover variant={'fit-content'}>
                  <div slot="target">
                    <p class="text-xs font-medium uppercase">
                      {measurements.title}
                    </p>
                    <div class="flex items-center gap-1.5">
                      {#if measurements.icon}
                        {@const { alt, src } = getImageAttributes(measurements.icon)}
                        <img class="max-h-2.5" {src} {alt} />
                      {/if}
                      <p class="text-5xl font-semibold md:text-2xl">{measurements.value}</p>
                    </div>
                  </div>
                  <div slot="popover">
                    <p class="whitespace-nowrap text-sm">{measurements.popover}</p>
                  </div>
                </Popover>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
  <div class="hidden border-t md:flex">
    <div class=" container mx-auto grid grid-cols-1 px-container md:grid-cols-[50%_50%]">
      {#each block.project || [] as testimonials}
        <div class="flex py-6 first:border-r first:pr-8 last:pl-8">
          {#each testimonials.testimonial || [] as testimonial}
            <RichTextTestimonial class="max-w-[470px]" variant="default" block={testimonial} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <div class="hidden border-t py-3 md:flex">
    <div class="container mx-auto flex justify-center px-container">
      <p class="text-base font-medium text-foreground-secondary">{block.note}</p>
    </div>
  </div>
  <!-- mobile -->
  <div class="container mx-auto px-container md:hidden">
    {#each block.project || [] as project}
      {#if project.thumbnail.length}
        {#if project.thumbnail[0]?.filename}
          {@const { src, alt, width, height } = getImageAttributes(project.thumbnail[0], {
            size: [540 * 2]
          })}
          <div class="rounded-lg bg-background-panel p-3 first:mb-4">
            <div class="flex pb-8">
              <img
                class="h-20 w-full max-w-[102px] rounded-md bg-background-offset object-cover"
                {src}
                {alt}
                {width}
                {height}
              />
              <div class="flex flex-col pl-3">
                <p class="text-lg font-semibold text-foreground-secondary">{project.name}</p>
                <p class="text-lg/[18px] font-semibold">{project.tagline}</p>
              </div>
            </div>
            <div class="mb-8 flex flex-wrap gap-6 gap-y-3">
              {#each project.measurements || [] as measurements}
                <div class="flex flex-col whitespace-nowrap">
                  <p class="text-xs font-medium uppercase">
                    {measurements.title}
                  </p>
                  <div class="flex items-center gap-1.5">
                    {#if measurements.icon}
                      {@const { alt, src } = getImageAttributes(measurements.icon)}
                      <img class="max-h-1.5" {src} {alt} />
                    {/if}
                    <p class="text-lg font-semibold">{measurements.value}</p>
                  </div>
                </div>
              {/each}
            </div>
            <div class="mb-8 flex flex-col">
              {#each project.testimonial || [] as testimonial}
                <span class="mb-2 text-base font-semibold"
                  >&ldquo;{testimonial.testimonial}&rdquo;</span
                >
                <div class="flex">
                  <p class="text-sm font-semibold">{testimonial.name}</p>
                  <p class="ml-1 text-sm font-semibold text-foreground-secondary">
                    {testimonial.position}
                  </p>
                </div>
              {/each}
            </div>
            {#if project.link_text}
              {@const { href } = getAnchorFromCmsLink(project.link)}
              <Button as="a" {href} variant="secondary" arrow>{project.link_text}</Button>
            {/if}
          </div>
        {/if}
      {/if}
    {/each}
    <div class="mx-auto mt-4 flex max-w-72 text-center">
      <p class="text-xs font-medium text-foreground-secondary">{block.note}</p>
    </div>
  </div>
</section>
