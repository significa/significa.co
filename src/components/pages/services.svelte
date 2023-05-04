<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import { Link } from '@significa/svelte-ui';

  export let data: ServicesPageStoryblok;

  console.log(data);
</script>

<Seo />
<main>
  <!-- Services -->
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto flex px-container pt-8 lg:pt-12">
      <div class="xl:max-w-3xl">
        <h3 class="text-5xl text-foreground-secondary">{data.awards_title}</h3>
        <p class="text-5xl">{data.awards_description}</p>
      </div>
    </div>
  </section>

  {#if data.awards?.length}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto justify-between gap-12 px-container lg:flex">
        <div class="flex flex-1 flex-col items-start">
          <div class="w-full flex-1">
            <ul>
              {#each data.awards as award}
                {@const { href, target, rel } = getAnchorFromCmsLink(award.link)}
                <li
                  class="flex items-center justify-between border-b bg-gradient-to-r py-5 first:border-t hover:from-transparent hover:via-foreground-tertiary/10 hover:to-transparent hover:transition-colors"
                >
                  <div class="flex items-center">
                    {#if award.image?.filename}
                      {@const { alt, src, width, height } = getImageAttributes(award.image, {
                        size: [120, 0]
                      })}
                      <img
                        class="mr-2 h-auto w-14 rounded-xs bg-background-offset"
                        {src}
                        {alt}
                        {width}
                        {height}
                      />
                    {/if}
                    <p class="ml-4 text-base font-semibold">{award.label}</p>
                  </div>
                  <Link {href} {target} {rel}>{award.label}</Link>
                  <p class="ml-4 text-base text-foreground-secondary">
                    {award.date && formatDate(new Date(award.date))}
                  </p>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>
  {/if}
</main>
