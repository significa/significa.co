<script lang="ts">
  import SplitLines from '$components/split-lines.svelte';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { AboutPageStoryblok } from '$types/bloks';

  export let data: AboutPageStoryblok;

  const cardsPostion = [
    { x: '0%', y: '45%', deg: 4, zidx: 1 },
    { x: '0%', y: '65%', deg: -14, zidx: 1 },
    { x: '-15%', y: '40%', deg: 4, zidx: 1 },
    { x: '0%', y: '55%', deg: -5, zidx: 3 },
    { x: '-10%', y: '25%', deg: -5, zidx: 2 },
    { x: '0%', y: '45%', deg: 10, zidx: 1 }
  ];
</script>

<main>
  <div class="container mx-auto px-container">
    <h1 class="mt-10 max-w-2xl text-8xl md:mt-14 lg:mt-20">{data.page_title}</h1>
  </div>
</main>

<!-- Who we are -->
<section class="mt-10 border-t md:mt-14 lg:mt-20">
  <div
    class="container mx-auto flex flex-col justify-between gap-7 px-container py-12 xl:flex-row xl:gap-4"
  >
    <div class="xl:max-w-xl">
      <h3 class="text-5xl text-foreground-secondary">{data.about_title1}</h3>
      <p class="text-5xl">{data.about_title2}</p>
    </div>

    <p class="whitespace-pre-line text-2xl text-foreground-secondary xl:max-w-xl">
      {data.about_description}
    </p>
  </div>
</section>

<!-- Office -->
<section class="overflow-hidden border-t">
  <div class="container mx-auto px-container pt-12">
    <div class="flex flex-col justify-between gap-7 xl:flex-row xl:gap-4">
      <div class="xl:max-w-lg">
        <h3 class="text-5xl text-foreground-secondary">{data.office_title1}</h3>
        <p class="text-5xl">{data.office_title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary xl:max-w-xl">
        {data.office_description}
      </p>
    </div>

    {#if !!data.office_cards?.length}
      <div class="isolate grid grid-cols-6 px-10">
        {#each data.office_cards as card, i}
          {#if card.component === 'photo_card' && card.photo}
            {@const { alt, src } = getImageAttributes(card.photo)}
            <div
              class="-mx-[10%] bg-white p-[4%] shadow-md"
              style={`transform:translate(${cardsPostion[i].x}, ${cardsPostion[i].y}) rotate(${cardsPostion[i].deg}deg); z-index: ${cardsPostion[i].zidx}`}
            >
              <img class="aspect-[3/4] object-cover" {src} {alt} />
            </div>
          {:else if card.component === 'notepad_card' && card.text}
            <div
              class="-mx-[10%]"
              style={`transform:translate(${cardsPostion[i].x}, ${cardsPostion[i].y}) rotate(${cardsPostion[i].deg}deg); z-index: ${cardsPostion[i].zidx}`}
            >
              <div class="aspect-[3/4] rounded-xs bg-background-panel p-4 shadow-md">
                <div class="mb-3 grid h-[10px] grid-cols-12 gap-[4%]">
                  {#each [...Array(12)] as _}
                    <div class="aspect-square rounded-full bg-background shadow-inner" />
                  {/each}
                </div>

                <SplitLines
                  text={card.text}
                  class="relative font-comic font-bold leading-8 after:absolute after:bottom-1 after:left-0 after:right-0 after:-mx-4 after:h-[1px] after:bg-background-offset"
                />
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</section>
