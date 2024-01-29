<script lang="ts">
  import Duck from '$components/pages/services/illustrations/duck.svelte';
  import Hand from '$components/pages/services/illustrations/hand.svelte';
  import Square from '$components/pages/services/illustrations/square.svelte';
  import type { ServiceStoryblok } from '$types/bloks';

  export let block: ServiceStoryblok;
</script>

<section class="mt-14 md:mt-24 lg:mb-12">
  <div class="container mx-auto flex px-container">
    <div class="xl:max-w-3xl">
      <h3 class="text-5xl text-foreground-secondary">{block.services_title}</h3>
      <h3 class="mb-2 text-5xl">{block.services_subtitle}</h3>
      <p class="text-2xl text-foreground-secondary">{block.services_description}</p>
    </div>
  </div>
</section>

<section>
  <div class="flex mt-11 md:mt-0">
    {#if block.services}
      <div class="w-full justify-between lg:border-b lg:border-t">
        <div class="container relative mx-auto grid grid-cols-1 px-container md:grid-cols-3">
          <Square class="absolute -bottom-10 left-[20%] hidden drop-shadow-md lg:block" />
          <Hand
            class="absolute -top-[76px] left-[54%] hidden drop-shadow-md md:-top-[60px] lg:block"
          />
          <Duck
            class="absolute -bottom-14 right-[20%] hidden drop-shadow-md md:right-[7%] lg:block"
          />
          {#each block.services as service}
            <div
              class="flex flex-col border-t mt-11 md:mt-0 last:border-b last:pb-11 pb-0 md:border-t-0 md:last:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0 lg:first-of-type:pl-0"
            >
              <p class="mb-2 mt-11 text-3xl font-semibold lg:mt-0">{service.title}</p>
              {#if service.entry}
                {#each service.entry as entry}
                  <div class="flex flex-col">
                    <p class="mt-8 text-xl font-semibold">{entry.title}</p>
                    {#if entry.list}
                      {#each entry.list as item}
                        <div class="flex flex-col">
                          <p class="mt-3 text-xl text-foreground-secondary">{item.label}</p>
                        </div>
                      {/each}
                    {/if}
                  </div>
                {/each}
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
