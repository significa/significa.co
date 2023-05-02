<script lang="ts">
  import clsx from 'clsx';
  import Pan from './illustrations/pan.svelte';
  import Egg1 from './illustrations/egg1.svelte';
  import Egg2 from './illustrations/egg2.svelte';
</script>

<div class={clsx('h-[253px] w-[402px]', $$restProps.class)}>
  <div class="relative">
    <Pan />
    <Egg1 class="absolute left-10 top-10 drop-shadow-md" />
    <Egg1 class="absolute bottom-7 left-20 rotate-[66deg] drop-shadow-md" />
    <Egg2 class="absolute left-36 top-14 drop-shadow-md" />
  </div>
</div>
