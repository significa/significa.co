<script lang="ts">
  import egg1 from '$assets/eggs/egg=01.svg';

  const eggs = Object.values(
    import.meta.glob('../../../../assets/eggs/*.svg', { eager: true, as: 'url' })
  );

  const updatePic = (i: number) => {
    if (!!document && document.getElementById('egg') !== null) {
      document.getElementById('egg').src = eggs[i];
    }
  };

  console.log(eggs.length);

  const picAnimation = (i: number) => {
    updatePic(i);
    if (i < eggs.length - 1)
      setTimeout(() => {
        picAnimation(i + 1);
      }, 400);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img id="egg" alt="" src={egg1} class="drop-shadow-sm" on:click={() => picAnimation(1)} />
