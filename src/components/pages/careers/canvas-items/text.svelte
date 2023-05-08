<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { TimelineTextStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';

  export let item: TimelineTextStoryblok;
</script>

<div
  class="absolute max-w-xs text-center"
  style="width: {item.width || '240'}px; left: {item.left || 0}px; top: {item.top || 0}px;"
>
  <p class="font-comic text-sm font-bold">{item.text}</p>
  {#if item.link?.[0]}
    {@const { href, target, rel } = getAnchorFromCmsLink(item.link[0].link)}
    <Button size="sm" as="a" {href} {rel} {target} class="mt-4">
      {item.link[0].label}
    </Button>
  {/if}
</div>
