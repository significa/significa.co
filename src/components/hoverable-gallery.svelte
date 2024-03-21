<script lang="ts">
  import type { NotepadCardStoryblok, PhotoCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import type { TransformOptions } from './hoverable-gallery-card.svelte';
  import HoverableGalleryCard from './hoverable-gallery-card.svelte';

  export let cards: (NotepadCardStoryblok | PhotoCardStoryblok)[];

  const cardsTransformOptions: { static: TransformOptions[]; hover: TransformOptions[] } = {
    static: [
      { x: '0%', y: '55%', deg: 4, z: 1 },
      { x: '0%', y: '75%', deg: -14, z: 1 },
      { x: '-15%', y: '50%', deg: 4, z: 1 },
      { x: '0%', y: '65%', deg: -5, z: 3 },
      { x: '-5%', y: '35%', deg: -5, z: 2 },
      { x: '0%', y: '55%', deg: 10, z: 1 }
    ],
    hover: [
      { x: '-5%', y: '5%', deg: -4, z: 1 },
      { x: '0%', y: '0%', deg: -5, z: 1 },
      { x: '-15%', y: '5%', deg: 2, z: 1 },
      { x: '0%', y: '0%', deg: 5, z: 3 },
      { x: '0%', y: '5%', deg: 5, z: 2 },
      { x: '10%', y: '3%', deg: 15, z: 1 }
    ]
  };
</script>

<div class={clsx('isolate hidden justify-center px-10 lg:grid lg:grid-cols-6', $$restProps.class)}>
  {#each cards.slice(0, 6) as card, i}
    <HoverableGalleryCard
      {card}
      staticTransformState={cardsTransformOptions.static[i]}
      hoverTransformState={cardsTransformOptions.hover[i]}
      class=" min-w-[280px] max-w-[280px] lg:min-w-[unset] lg:max-w-[unset]"
    />
  {/each}
</div>

<!-- Mobile -->
<div class={clsx('flex justify-center lg:hidden', $$restProps.class)}>
  {#each cards.filter((c) => c.component === 'notepad_card').slice(0, 1) as card}
    <HoverableGalleryCard
      {card}
      staticTransformState={{ x: '0%', y: '0%', z: 1, deg: 4 }}
      hoverTransformState={{ x: '0%', y: '0%', z: 1, deg: 4 }}
      class="-mb-56 min-w-[280px] max-w-[280px] lg:min-w-[unset] lg:max-w-[unset]"
    />
  {/each}
</div>
