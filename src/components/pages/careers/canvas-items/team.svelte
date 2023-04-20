<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { CanvasTeamStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let item: CanvasTeamStoryblok;
</script>

<div class={clsx('absolute', $$restProps.class)}>
  <p class="mb-2 text-xs font-medium uppercase text-foreground-secondary">{item.name}</p>
  <div class="relative select-none whitespace-nowrap border-[1px] border-foreground-secondary p-3">
    <div class="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <div class="absolute -right-[3px] -top-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <div class="absolute -bottom-[3px] -left-[3px] h-[6px] w-[6px] bg-foreground-secondary" />
    <div class="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px] bg-foreground-secondary" />

    <div class="flex">
      {#each item.roster || [] as member}
        {#if member.content.photo?.filename}
          {@const { src } = getImageAttributes(member.content.photo, { size: [36 * 4, 40 * 4] })}
          <div
            class="-ml-3 flex items-center justify-center bg-background first:ml-0"
            style="width: 40px; height: 44px; clip-path: path('M20 44C30.9998 44 40 35.2835 40 24.4299C40 19.0863 37.8073 13.07 34.3347 8.3851C30.8778 3.72139 25.8526 0 20 0C14.1474 0 9.12224 3.72139 5.66534 8.3851C2.19272 13.07 0 19.0863 0 24.4299C0 35.2835 9.00016 44 20 44Z')"
          >
            <a href={sanitizeSlug(member.full_slug)}>
              <div
                style="background-image: url({src}); width: 36px; height: 40px; clip-path: path('M36 22.4299C36 32.1336 27.9411 40 18 40C8.05887 40 0 32.1336 0 22.4299C0 12.7262 8.05887 0 18 0C27.9411 0 36 12.7262 36 22.4299Z')"
                class="bg-background-offset bg-cover bg-center bg-no-repeat"
              />
            </a>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
