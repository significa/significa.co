<script lang="ts">
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { AboutPageStoryblok, TimelineArrowStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';

  type Arrows = TimelineArrowStoryblok['variant'];
  const files = import.meta.glob('./arrows/*.svg', { as: 'raw', eager: true });
  const arrows = Object.entries(files).reduce((acc, [path, file]) => {
    const name = path.replace('./arrows/', '').replace('.svg', '') as Arrows;
    acc[name] = file;
    return acc;
  }, {} as Record<Arrows, string>);

  export let timeline: AboutPageStoryblok['timeline'];
</script>

<div class="flex h-[800px] bg-background-offset">
  {#each timeline || [] as section}
    <div class="relative min-w-[300px]" style={section.style}>
      {#each section.items || [] as item}
        {#if item.component === 'timeline-arrow'}
          <div class="absolute text-foreground-secondary" style={item.style}>
            {@html arrows[item.variant]}
          </div>
        {:else if item.component === 'timeline-image'}
          {#if item.image?.filename}
            {@const { src, alt, width, height } = getImageAttributes(item.image)}
            <div
              class="absolute"
              style={`width: ${+width / 2}px; height: ${+height / 2}px; ${item.style}`}
            >
              <img
                {src}
                {alt}
                {width}
                {height}
                class={clsx(item.border && 'border-[10px] border-white drop-shadow')}
              />
            </div>
          {/if}
        {:else if item.component === 'timeline-text'}
          <div class="absolute max-w-xs text-center font-comic text-sm" style={item.style}>
            <p>{item.text}</p>
            {#if item.link?.[0]}
              {@const { href, target, rel } = getAnchorFromCmsLink(item.link[0].link)}
              <Button size="sm" as="a" {href} {rel} {target} class="mt-4">
                {item.link[0].label}
              </Button>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>
