<script lang="ts">
  import { t } from '$lib/i18n';
  import type { PhysicsInputStoryblok } from '$types/bloks';
  import { Button, Input } from '@significa/svelte-ui';

  export let block: PhysicsInputStoryblok;
  export let ref: HTMLElement;
  export let name: string;
  export let form: string;
</script>

<div class={$$restProps.class} bind:this={ref}>
  <div class="relative">
    <Input
      {name}
      placeholder={block.placeholder}
      class="h-[60px] min-w-[300px] bg-background-offset pr-16 text-xl placeholder:text-xl"
      size="lg"
      autocomplete="off"
    />
    <Button
      {form}
      arrow
      class="absolute bottom-2 right-2 top-2"
      size="md"
      aria-label={t('a11y.physics-add')}
    />
  </div>
</div>
