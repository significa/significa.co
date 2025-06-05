<script lang="ts">
  import type { MeasurementsStoryblok } from '$types/bloks';
  import Popover from '$components/proposals/popover.svelte';
  import { getImageAttributes } from '$lib/utils/cms';

  export let block: MeasurementsStoryblok;
</script>

{#if block.blocks && block.blocks.length > 0}
  <div class="mx-auto flex max-w-2xl flex-wrap gap-6 gap-y-3 py-6 md:gap-8 md:gap-y-4">
    {#each block.blocks || [] as measurements}
      <div class="flex flex-col whitespace-nowrap">
        <Popover variant={'fit-content'}>
          <div slot="target">
            <p class="text-xs font-medium uppercase">
              {measurements.title}
            </p>
            <div class="flex items-center gap-1.5">
              {#if measurements.icon}
                {@const { alt, src } = getImageAttributes(measurements.icon)}
                <img class="max-h-1.5" {src} {alt} />
              {/if}
              <p class="text-lg font-semibold md:text-2xl">{measurements.value}</p>
            </div>
          </div>
          <div slot="popover">
            <p class="whitespace-nowrap text-sm">{measurements.popover}</p>
          </div>
        </Popover>
      </div>
    {/each}
  </div>
{/if}
