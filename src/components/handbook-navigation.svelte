<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Button, Icon, Link, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import AnHandAndABook from './an-hand-and-a-book.svelte';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { t } from '$lib/i18n';

  export let configuration: ConfigurationStoryblok;
</script>

<header
  class={clsx('fixed top-0 z-30 w-full border-b border-b-border bg-background/95 backdrop-blur-md')}
>
  <div class={clsx('container mx-auto flex items-center justify-between px-container py-4')}>
    <a class="flex items-center gap-2" aria-label="Go to homepage" href="/handbook">
      <Logo class="mt-1" variant="wordmark" />
      <AnHandAndABook />
    </a>

    <div class="flex items-center gap-8">
      <div class="flex items-center gap-4">
        {#if configuration.call_to_action?.length}
          {@const { href } = getAnchorFromCmsLink(configuration.call_to_action[0].link)}
          <div class="block">
            <Button as="a" {href}>{configuration.call_to_action[0].label}</Button>
          </div>
        {/if}
      </div>

      <div class="hidden items-center gap-1 text-sm font-medium leading-relaxed lg:flex">
        <Icon icon="home" />
        <Link href={sanitizeSlug('/')} target="_blank" rel="noopener noreferrer">
          {t('handbook.navigation.website')}
        </Link>
      </div>
    </div>
  </div>
</header>
