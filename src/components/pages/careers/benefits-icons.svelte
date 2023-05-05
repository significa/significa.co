<script lang="ts" context="module">
  const files = import.meta.glob('./icons/*.svg', { as: 'raw', eager: true });

  export const icons = Object.entries(files).reduce((acc, [path, file]) => {
    const name = path.replace('./icons/', '').replace('.svg', '');
    acc[name] = file;
    return acc;
  }, {} as Record<string, string>);

  export type IconOptions =
    | 'book'
    | 'laptop'
    | 'grow'
    | 'clock'
    | 'baby'
    | 'backpack'
    | 'bus'
    | 'calendar'
    | 'gym'
    | 'health'
    | 'heart'
    | 'referral'
    | 'sun'
    | 'support';
</script>

<script lang="ts">
  let className: undefined | string = undefined;
  export { className as class };
  export let icon: IconOptions;
</script>

{#if icons[icon]}
  <i data-icon={icon} aria-hidden="true" class={className} {...$$restProps}>
    {@html icons[icon]}
  </i>
{/if}
