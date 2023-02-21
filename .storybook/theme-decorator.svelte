<script lang="ts">
  export let theme: string;

  $: document.body.setAttribute('data-theme', theme);
</script>

<slot />
