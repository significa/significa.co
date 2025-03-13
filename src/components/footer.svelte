<script lang="ts">
  import { page } from '$app/stores';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { sanitizeSlug } from '$lib/utils/paths';
  import type { ConfigurationStoryblok } from '$types/bloks';
  import { Badge, Link, Logo } from '@significa/svelte-ui';
  import Slogan from './slogan.svelte';
  import { intersectionObserver } from '@significa/svelte-ui/actions';

  export let configuration: ConfigurationStoryblok;
  let animate = false;
</script>

<footer>
  <div class="container mx-auto grid grid-cols-8 gap-8 px-container py-20">
    <div class="col-span-8 flex flex-col justify-between md:col-span-3 lg:col-span-4">
      <Logo variant="symbol" class="md:origin-top-left md:scale-125" />
      <span
        use:intersectionObserver={{
          callback: ([e]) => {
            if (e.isIntersecting) {
              animate = true;
            }
          },
          options: { threshold: [1] }
        }}
      >
        <Slogan {animate} class="hidden font-bold md:block" />
      </span>

      {#if !!configuration.footer_logo_two?.length || !!configuration.footer_logo?.length}
        <div class="-ml-2 hidden h-20 items-center gap-7 md:flex">
          {#if !!configuration.footer_logo_two}
            {#each configuration.footer_logo_two || [] as logo}
              {#if logo.light_mode?.filename}
                {@const { src, alt, width, height } = getImageAttributes(logo.light_mode, {
                  size: [0, 720]
                })}
                <img
                  {src}
                  {alt}
                  {width}
                  {height}
                  class="mt-[7px] h-auto max-h-24 w-auto object-contain dark:hidden"
                />
              {/if}
              {#if logo.dark_mode?.filename}
                {@const { src, alt, width, height } = getImageAttributes(logo.dark_mode, {
                  size: [0, 720]
                })}
                <img
                  {src}
                  {alt}
                  {width}
                  {height}
                  class="mt-[7px] hidden h-auto max-h-24 w-auto object-contain dark:block"
                />
              {/if}
            {/each}
          {/if}
          {#if !!configuration.footer_logo}
            {#each configuration.footer_logo || [] as logo}
              {#if logo.light_mode?.filename}
                {@const { src, alt, width, height } = getImageAttributes(logo.light_mode, {
                  size: [0, 720]
                })}
                <img
                  {src}
                  {alt}
                  {width}
                  {height}
                  class="h-auto max-h-12 w-auto object-contain dark:hidden"
                />
              {/if}
              {#if logo.dark_mode?.filename}
                {@const { src, alt, width, height } = getImageAttributes(logo.dark_mode, {
                  size: [0, 720]
                })}
                <img
                  {src}
                  {alt}
                  {width}
                  {height}
                  class="hidden h-auto max-h-12 w-auto object-contain dark:block"
                />
              {/if}
            {/each}
          {/if}
        </div>
      {/if}
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
                        <span aria-hidden="true">
                          <Badge
                            class="absolute -right-6 top-1/2 -translate-y-1/2 text-xs leading-none"
                          >
                            {$page.data.careers.length}
                          </Badge>
                        </span>
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

    {#if !!configuration.footer_logo_two?.length || !!configuration.footer_logo?.length}
      <div class="col-span-3 -ml-2 flex h-20 items-center gap-7 md:hidden">
        {#if !!configuration.footer_logo_two?.length}
          {#each configuration.footer_logo_two || [] as logo}
            {#if logo.light_mode?.filename}
              {@const { src, alt, width, height } = getImageAttributes(logo.light_mode, {
                size: [0, 720]
              })}
              <img
                {src}
                {alt}
                {width}
                {height}
                class="mt-[7px] h-auto max-h-24 w-auto object-contain dark:hidden"
              />
            {/if}
            {#if logo.dark_mode?.filename}
              {@const { src, alt, width, height } = getImageAttributes(logo.dark_mode, {
                size: [0, 720]
              })}
              <img
                {src}
                {alt}
                {width}
                {height}
                class="mt-[7px] hidden h-auto max-h-24 w-auto object-contain dark:block"
              />
            {/if}
          {/each}
        {/if}
        {#if !!configuration.footer_logo?.length}
          {#each configuration.footer_logo || [] as logo}
            {#if logo.light_mode?.filename}
              {@const { src, alt, width, height } = getImageAttributes(logo.light_mode, {
                size: [0, 720]
              })}
              <img
                {src}
                {alt}
                {width}
                {height}
                class="h-auto max-h-12 w-auto object-contain dark:hidden"
              />
            {/if}
            {#if logo.dark_mode?.filename}
              {@const { src, alt, width, height } = getImageAttributes(logo.dark_mode, {
                size: [0, 720]
              })}
              <img
                {src}
                {alt}
                {width}
                {height}
                class="hidden h-auto max-h-12 w-auto object-contain dark:block"
              />
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
  </div>

  <div>
    <div
      class="container mx-auto flex flex-col items-start justify-between px-container py-4 text-sm text-foreground-secondary xs:flex-row xs:items-center"
    >
      <span>Significa &mdash; Digital Product Design & Development Agency</span>
      <Link href="/legal">Legal</Link>
    </div>
  </div>
</footer>
