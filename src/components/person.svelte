<script lang="ts">
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AssetStoryblok } from '$types/bloks';
  import { Avatar } from '@significa/svelte-ui';
  import clsx from 'clsx';

  let className: string | undefined = undefined;
  export { className as class };

  export let is_active: boolean | undefined = undefined;
  export let name: string;
  export let position: string | undefined = undefined;
  export let photo: AssetStoryblok | undefined = undefined;
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
        {!is_active ? `${t('team.former')} ` : ''}{position}
      </p>
    {/if}
  </div>
</div>
