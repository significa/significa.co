<script lang="ts">
  import { page } from '$app/stores';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Badge, Link, Logo } from '@significa/svelte-ui';
  import Slogan from './slogan.svelte';

  export let configuration: ConfigurationStoryblok;
</script>

<footer>
  <div class="container mx-auto grid grid-cols-8 gap-8 px-container py-20">
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
          <ul class="text-lg leading-normal">
            {#each column.links || [] as link}
              {#if column.component === 'footer-column-internal'}
                <li class="mb-2">
                  <Link
                    class="relative"
                    active={$page.url.pathname === sanitizeSlug(link.full_slug)}
                    href={sanitizeSlug(link.full_slug)}
                  >
                    {link.name}
                    {#if sanitizeSlug(link.full_slug) === '/careers'}
                      {#if $page.data.careers.length}
                        <Badge
                          class="absolute -right-6 top-1/2 -translate-y-1/2 text-xs leading-none"
                          >{$page.data.careers.length}</Badge
                        >
                      {/if}
                    {/if}
                  </Link>
                </li>
              {:else if column.component === 'footer-column-external'}
                {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
                <li class="mb-2">
                  <Link {href} {target} {rel}>{link.label}</Link>
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
      class="container mx-auto flex flex-col items-start justify-between px-container py-4 text-sm text-foreground-secondary xs:flex-row xs:items-center"
    >
      <span>Significa &mdash; Design-led digital products</span>
      <Link href="/legal">Legal</Link>
    </div>
  </div>
</footer>
