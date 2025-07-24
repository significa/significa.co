<script lang="ts">
  import { page } from '$app/stores';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Button, Icon, Link, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import AnHandAndABook from './an-hand-and-a-book.svelte';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { t } from '$lib/i18n';
  import AiButton from './ai-chatbot/ai-chatbot-button.svelte';

  export let configuration: ConfigurationStoryblok;

  $: isShellbyRoute = $page.url.pathname === '/handbook/shellby';
</script>

<header
  class={clsx('fixed top-0 z-30 w-full border-b border-b-border bg-background/95 backdrop-blur-md')}
>
  <div
    class={clsx(
      'container mx-auto grid items-center px-container pb-1 pt-4 md:pb-4',
      'grid-cols-[1fr_1fr] grid-rows-[auto_auto] md:grid-rows-1',
      'gap-8 gap-y-2 md:grid-cols-[1fr_1fr_1fr] md:gap-y-4',
      isShellbyRoute && '!gap-y-0 pb-4'
    )}
  >
    <a class="flex items-center gap-2" aria-label="Go to homepage" href="/handbook">
      <Logo class="mt-1" variant="wordmark" />
      <AnHandAndABook />
    </a>

    <div
      class={clsx(
        'col-span-2 row-start-2 w-full md:col-span-1 md:col-start-2 md:row-start-1 lg:max-w-[450px]'
      )}
    >
      {#if !isShellbyRoute}
        <div class="md:flex md:justify-around">
          <AiButton mobileText="Hey there, ask Shellby something..." as="a" href="/handbook/shellby"
            >Ask Shellby</AiButton
          >
        </div>
      {/if}
    </div>

    <div class="flex items-center justify-end gap-8">
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
