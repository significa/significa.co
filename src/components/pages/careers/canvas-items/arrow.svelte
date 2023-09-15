<script lang="ts">
  import type { TimelineArrowStoryblok } from '$types/bloks';

  type Arrows = TimelineArrowStoryblok['variant'];
  const files = import.meta.glob('../../../illustrations/arrows/*.svg', {
    as: 'raw',
    eager: true
  });
  const arrows = Object.entries(files).reduce(
    (acc, [path, file]) => {
      const name = path.replace('../../../illustrations/arrows/', '').replace('.svg', '') as Arrows;
      acc[name] = file;
      return acc;
    },
    {} as Record<Arrows, string>
  );

  export let item: TimelineArrowStoryblok;
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<div
  class="absolute text-foreground-secondary"
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: scale({item.scale ||
    1}) rotate({item.rotate || 0}deg) scaleX({item.flip ? '-1' : '1'})"
>
  {@html arrows[item.variant]}
</div>
