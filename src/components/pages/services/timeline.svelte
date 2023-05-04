<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { theme } from '$lib/stores/theme';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let timeline: NonNullable<ServicesPageStoryblok['timeline']>;
</script>

<section class={clsx('overflow-auto', $$restProps.class)}>
  {#each timeline || [] as row}
    <div class="border-b" use:storyblokEditable={row}>
      <div class="container mx-auto flex min-w-[1536px] flex-col gap-5 px-container py-6">
        {#each row.subrows || [] as subrow, i}
          <div class="flex items-center" use:storyblokEditable={subrow}>
            <div class="ml-6 w-28">
              {#if i === 0}
                <p class="text-base font-semibold">{row.title}</p>
              {/if}
            </div>

            <div class="flex gap-6">
              {#each subrow.cells || [] as cell}
                {#if cell.before_dark?.filename && cell.before_light?.filename}
                  {@const img = $theme === 'light' ? cell.before_light : cell.before_dark}
                  {@const { width, height, src, alt } = getImageAttributes(img)}
                  <div
                    class="relative"
                    style="margin-left: {cell.left_offset || 0}px;"
                    use:storyblokEditable={cell}
                  >
                    <img {width} {height} {src} {alt} />
                    <p
                      class="absolute left-4 top-[50%] -translate-y-[50%] text-sm font-semibold text-[#F7F7F7]"
                    >
                      {cell.label}
                    </p>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>
