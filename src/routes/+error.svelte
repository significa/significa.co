<script lang="ts">
  import Illustration from '$components/illustrations/404.svelte';
  import Fred from '$components/illustrations/fred.svelte';
  import Alec from '$components/illustrations/alec.svelte';
  import FriedEgg from '$components/illustrations/fried-egg.svelte';
  import Marralhinha from '$components/illustrations/marralhinha.svelte';
  import Strategy from '$components/illustrations/strategy.svelte';
  import Flamingo from '$components/illustrations/flamingo.svelte';
  import Manel from '$components/illustrations/manel.svelte';
  import Mariana from '$components/illustrations/mariana.svelte';
  import Elisa from '$components/illustrations/elisa.svelte';
  import AnaFernandes from '$components/illustrations/ana-fernandes.svelte';
  import Brandao from '$components/illustrations/brandao.svelte';
  import JoaoRibeiro from '$components/illustrations/joao-ribeiro.svelte';
  import RuiFerreira from '$components/illustrations/rui-ferreira.svelte';
  import RuiSereno from '$components/illustrations/rui-sereno.svelte';
  import RuiSousa from '$components/illustrations/rui-sousa.svelte';
  import Joel from '$components/illustrations/joel.svelte';
  import Michelle from '$components/illustrations/michelle.svelte';
  import FranciscoMarques from '$components/illustrations/francisco-marques.svelte';
  import FranciscoTeixeira from '$components/illustrations/francisco-teixeira.svelte';
  import Catarina from '$components/illustrations/catarina.svelte';
  import AndreResendes from '$components/illustrations/andre-resendes.svelte';
  import Cocktail from '$components/illustrations/cocktail.svelte';
  import Contact from '$components/illustrations/contact.svelte';
  import DanielAlmeida from '$components/illustrations/daniel-almeida.svelte';
  import Design from '$components/illustrations/design.svelte';
  import Development from '$components/illustrations/development.svelte';
  import Esteph from '$components/illustrations/esteph.svelte';
  import Filipe from '$components/illustrations/filipe.svelte';
  import Guilherme from '$components/illustrations/guilherme.svelte';
  import IceCream from '$components/illustrations/ice-cream.svelte';
  import Ines from '$components/illustrations/ines.svelte';
  import Nobita from '$components/illustrations/nobita.svelte';
  import Patricia from '$components/illustrations/patricia.svelte';
  import Pintainho from '$components/illustrations/pintainho.svelte';
  import Plane from '$components/illustrations/plane.svelte';
  import Quim from '$components/illustrations/quim.svelte';
  import Ricardo from '$components/illustrations/ricardo.svelte';
  import Rita from '$components/illustrations/rita.svelte';
  import Teresa from '$components/illustrations/teresa.svelte';
  import Tiago from '$components/illustrations/tiago.svelte';
  import Trophy from '$components/illustrations/trophy.svelte';

  let screenWidth: number;
  let screenHeight: number;
  let seenTop: number[] = [];
  let seenLeft: number[] = [];

  const getRandomPosition = (height: number, width: number) => {
    let top = Math.floor(Math.random() * height - 100);
    let left = Math.floor(Math.random() * width);
    let rotate = Math.floor(Math.random() * 180);
    let hasOverlap = false;
    for (let i = 0; i < seenTop.length; i++) {
      if (Math.abs(seenTop[i] - top) < 10 && Math.abs(seenLeft[i] - left) < 10) {
        hasOverlap = true;
      }
    }
    if (hasOverlap) {
      getRandomPosition(height, width);
    } else if (top && left) {
      seenTop.push(top);
      seenLeft.push(left);
      return `--top:${top}px;--left:${left}px;--rotate:${rotate}deg`;
    }
  };
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />
<div class="relative flex h-full w-full items-center justify-center">
  <div
    style={getRandomPosition(screenHeight, screenWidth)}
    class="z-10"
    on:click={() => console.log('found me :))')}
  >
    <Nobita />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Fred />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FriedEgg />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Manel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Mariana />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Elisa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AnaFernandes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Brandao />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <JoaoRibeiro />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiFerreira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSereno />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSousa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Joel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Michelle />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoMarques />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoTeixeira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Marralhinha />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Strategy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Flamingo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Alec />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Catarina />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AndreResendes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Cocktail />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Contact />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <DanielAlmeida />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Design />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Development />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Esteph />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Filipe />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Guilherme />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <IceCream />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ines />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Patricia />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Pintainho />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Plane />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Quim />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ricardo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Rita />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Teresa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Tiago />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Trophy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Fred />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FriedEgg />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Manel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Mariana />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Elisa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AnaFernandes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Brandao />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <JoaoRibeiro />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiFerreira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSereno />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSousa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Joel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Michelle />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoMarques />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoTeixeira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Marralhinha />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Strategy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Flamingo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Alec />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Catarina />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AndreResendes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Cocktail />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Contact />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <DanielAlmeida />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Design />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Development />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Esteph />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Filipe />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Guilherme />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <IceCream />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ines />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Patricia />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Pintainho />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Plane />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Quim />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ricardo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Rita />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Teresa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Tiago />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Trophy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Fred />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FriedEgg />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Manel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Mariana />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Elisa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AnaFernandes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Brandao />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <JoaoRibeiro />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiFerreira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSereno />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSousa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Joel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Michelle />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoMarques />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoTeixeira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Marralhinha />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Strategy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Flamingo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Alec />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Catarina />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AndreResendes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Cocktail />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Contact />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <DanielAlmeida />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Design />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Development />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Esteph />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Filipe />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Guilherme />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <IceCream />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ines />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Patricia />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Pintainho />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Plane />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Quim />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ricardo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Rita />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Teresa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Tiago />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Trophy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Fred />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FriedEgg />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Manel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Mariana />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Elisa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AnaFernandes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Brandao />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <JoaoRibeiro />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiFerreira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSereno />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <RuiSousa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Joel />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Michelle />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoMarques />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <FranciscoTeixeira />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Marralhinha />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Strategy />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Flamingo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Alec />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Catarina />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <AndreResendes />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Cocktail />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Contact />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <DanielAlmeida />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Design />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Development />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Esteph />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Filipe />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Guilherme />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <IceCream />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ines />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Patricia />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Pintainho />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Plane />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Quim />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Ricardo />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Rita />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Teresa />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Tiago />
  </div>
  <div style={getRandomPosition(screenHeight, screenWidth)}>
    <Trophy />
  </div>
  <Illustration class="z-10" />
</div>

<style>
  div {
    position: absolute;
    top: var(--top);
    left: var(--left);
    transform: rotate(var(--rotate));
  }
</style>
