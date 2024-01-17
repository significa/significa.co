<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { Avatar } from '@significa/svelte-ui';
  import clsx from 'clsx';

  let className: string | undefined = undefined;
  export { className as class };

  export let name: string;
  export let position: string | undefined = undefined;
  export let photo: AssetStoryblok | undefined = undefined;
  export let email: AssetStoryblok | undefined = undefined;
</script>

<div class={clsx('flex items-center gap-3 whitespace-nowrap', className)}>
  <Avatar
    class="flex-shrink-0"
    image={photo?.filename ? getImageAttributes(photo, { size: [100, 100] }).src : undefined}
    size="sm"
  />
  <div>
    {#if name}
      <p class="text-base font-semibold leading-none">{name}</p>
    {/if}
    {#if position}
      <p class="mt-1 text-base font-semibold leading-none text-foreground-secondary">
        {position}
      </p>
    {/if}
    {#if email}
      <p class="mt-1 text-base font-semibold leading-none text-foreground-secondary">
        {email}
      </p>
    {/if}
  </div>
</div>
