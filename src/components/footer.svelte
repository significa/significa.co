<script lang="ts">
  import { page } from '$app/stores';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Link, Logo } from '@significa/svelte-ui';
  import Slogan from './slogan.svelte';

  export let configuration: ConfigurationStoryblok;
</script>

<footer>
  <div class="container grid grid-cols-8 gap-8 py-20">
    <div class="col-span-8 md:col-span-3 lg:col-span-4">
      <Logo variant="symbol" />
      <Slogan class="mt-32 hidden md:block" />
    </div>

    <div class="col-span-8 flex flex-col gap-8 xs:flex-row md:col-span-5 lg:col-span-4">
      {#each configuration.footer || [] as column}
        <div class="flex-1">
          <p class="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
            {column.title}
          </p>
          <ul class="text-lg leading-relaxed">
            {#each column.links || [] as link}
              {#if column.component === 'footer-column-internal'}
                <li class="mb-2">
                  <Link
                    active={$page.url.pathname === sanitizeSlug(link.full_slug)}
                    class="inline-block"
                    href={sanitizeSlug(link.full_slug)}>{link.name}</Link
                  >
                </li>
              {:else if column.component === 'footer-column-external'}
                {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
                <li class="mb-2">
                  <Link class="inline-block" {href} {target} {rel}>{link.label}</Link>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>

  <div class="">
    <div
      class="container flex flex-col items-start justify-between py-4 text-sm text-foreground-secondary xs:flex-row xs:items-center"
    >
      <span>Significa &mdash; Design-led digital products</span>
      <Link href="/legal">Legal</Link>
    </div>
  </div>
</footer>
