<script lang="ts">
  import type { NotepadCardStoryblok, PhotoCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import OfficeCard, { type TransformOptions } from './office-card.svelte';

  export let cards: (NotepadCardStoryblok | PhotoCardStoryblok)[] | undefined = undefined;
  export let firstTitle: string | undefined = undefined;
  export let secondTitle: string | undefined = undefined;
  export let description: string | undefined = undefined;

  const cardsTransformOptions: { static: TransformOptions[]; hover: TransformOptions[] } = {
    static: [
      { x: '0%', y: '45%', deg: 4, z: 1 },
      { x: '0%', y: '65%', deg: -14, z: 1 },
      { x: '-15%', y: '40%', deg: 4, z: 1 },
      { x: '0%', y: '55%', deg: -5, z: 3 },
      { x: '-5%', y: '25%', deg: -5, z: 2 },
      { x: '0%', y: '45%', deg: 10, z: 1 }
    ],
    hover: [
      { x: '-5%', y: '-5%', deg: -4, z: 1 },
      { x: '0%', y: '-10%', deg: -5, z: 1 },
      { x: '-15%', y: '5%', deg: 2, z: 1 },
      { x: '0%', y: '-10%', deg: 5, z: 3 },
      { x: '0%', y: '-25%', deg: 5, z: 2 },
      { x: '10%', y: '5%', deg: 15, z: 1 }
    ]
  };
</script>

<section class="overflow-hidden border-t">
  <div class="container mx-auto px-container pt-12">
    <div class="flex flex-col justify-between gap-7 xl:flex-row xl:gap-4">
      <div class="xl:max-w-lg">
        <h3 class="text-5xl text-foreground-secondary">{firstTitle}</h3>
        <p class="text-5xl">{secondTitle}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary xl:max-w-xl">
        {description}
      </p>
    </div>

    {#if !!cards?.length}
      <div class="isolate -mt-20 flex justify-center px-10 lg:mt-0 lg:grid lg:grid-cols-6">
        {#each cards.slice(0, 6) as card, i}
          <OfficeCard
            {card}
            staticTransformState={cardsTransformOptions.static[i]}
            hoverTransformState={cardsTransformOptions.hover[i]}
            class={clsx(
              card.component === 'photo_card' ? 'hidden lg:block' : 'max-w-[280px] lg:max-w-[unset]'
            )}
          />
        {/each}
      </div>
    {/if}
  </div>
</section>
