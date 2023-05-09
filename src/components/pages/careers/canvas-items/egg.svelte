<script lang="ts">
  import egg1 from '$assets/egg=01.svg';
  import egg2 from '$assets/egg=02.svg';
  import egg3 from '$assets/egg=03.svg';
  import egg4 from '$assets/egg=04.svg';
  import egg5 from '$assets/egg=05.svg';
  import egg6 from '$assets/egg=06.svg';
  import egg7 from '$assets/egg=07.svg';
  import egg8 from '$assets/egg=08.svg';

  const updatePic = (i: number) => {
    if (!!document && document.getElementById('egg') !== null) {
      if (i === 2) document.getElementById('egg').src = egg2;
      if (i === 3) document.getElementById('egg').src = egg3;
      if (i === 4) document.getElementById('egg').src = egg4;
      if (i === 5) document.getElementById('egg').src = egg5;
      if (i === 6) document.getElementById('egg').src = egg6;
      if (i === 7) document.getElementById('egg').src = egg7;
      if (i === 8) document.getElementById('egg').src = egg8;
    }
  };

  const picAnimation = (i: number) => {
    updatePic(i);
    if (i < 8)
      setTimeout(() => {
        picAnimation(i + 1);
      }, 400);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img id="egg" alt="" src={egg1} class="drop-shadow-sm" on:click={() => picAnimation(1)} />
