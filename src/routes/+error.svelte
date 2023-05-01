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

  const components = [
    { name: Fred },
    { name: Alec },
    { name: Nobita, class: 'nobita' },
    { name: FriedEgg },
    { name: Marralhinha },
    { name: Strategy },
    { name: Flamingo },
    { name: Manel },
    { name: Mariana },
    { name: Elisa },
    { name: AnaFernandes },
    { name: Brandao },
    { name: JoaoRibeiro },
    { name: RuiFerreira },
    { name: RuiSereno },
    { name: RuiSousa },
    { name: Joel },
    { name: Michelle },
    { name: FranciscoMarques },
    { name: FranciscoTeixeira },
    { name: Catarina },
    { name: AndreResendes },
    { name: Cocktail },
    { name: Contact },
    { name: DanielAlmeida },
    { name: Design },
    { name: Development },
    { name: Esteph },
    { name: Filipe },
    { name: Guilherme },
    { name: IceCream },
    { name: Ines },
    { name: Patricia },
    { name: Pintainho },
    { name: Plane },
    { name: Quim },
    { name: Ricardo },
    { name: Rita },
    { name: Teresa },
    { name: Tiago },
    { name: Trophy },
    { name: Design },
    { name: Development },
    { name: Fred },
    { name: Alec },
    { name: FriedEgg },
    { name: Marralhinha },
    { name: Strategy },
    { name: Flamingo },
    { name: Manel },
    { name: Mariana },
    { name: Elisa },
    { name: AnaFernandes },
    { name: Brandao },
    { name: JoaoRibeiro },
    { name: RuiFerreira },
    { name: RuiSereno },
    { name: RuiSousa },
    { name: Joel },
    { name: Michelle },
    { name: FranciscoMarques },
    { name: FranciscoTeixeira },
    { name: Catarina },
    { name: AndreResendes },
    { name: Cocktail },
    { name: Contact },
    { name: DanielAlmeida },
    { name: Design },
    { name: Development },
    { name: Esteph },
    { name: Filipe },
    { name: Guilherme },
    { name: IceCream },
    { name: Ines },
    { name: Patricia },
    { name: Pintainho },
    { name: Plane },
    { name: Quim },
    { name: Ricardo },
    { name: Rita },
    { name: Teresa },
    { name: Tiago },
    { name: Trophy },
    { name: Design },
    { name: Development }
  ];

  const shuffledArray = components.sort(() => 0.5 - Math.random());

  const nobitaIndex = shuffledArray.map((el) => el.class).indexOf('nobita');

  const isNobitaLeftScreenEdge = nobitaIndex % 12 === 0;
  const isNobitaRightScreenEdge = nobitaIndex % 12 === 11;

  const isFoundAbove = shuffledArray[nobitaIndex - 12];
  const isFoundAboveLeft = !isNobitaLeftScreenEdge ? shuffledArray[nobitaIndex - 13] : null;
  const isFoundAboveRight = !isNobitaRightScreenEdge ? shuffledArray[nobitaIndex - 11] : null;
  const isFoundBelow = shuffledArray[nobitaIndex + 12];
  const isFoundBelowLeft = !isNobitaLeftScreenEdge ? shuffledArray[nobitaIndex + 11] : null;
  const isFoundBelowRight = !isNobitaRightScreenEdge ? shuffledArray[nobitaIndex + 13] : null;
  const isFoundLeft = !isNobitaLeftScreenEdge ? shuffledArray[nobitaIndex - 1] : null;
  const isFoundRight = !isNobitaRightScreenEdge ? shuffledArray[nobitaIndex + 1] : null;

  let screenWidth: number;
  let screenHeight: number;

  const getRandomRotation = () => {
    return `--rotate:${Math.floor(Math.random() * 180)}deg;margin-top: -100px;`;
  };

  let isFound = false;
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />
<div
  class="fixed grid h-full w-full grid-cols-12 overflow-hidden"
  style="padding-top: 100px; padding-left: -50px;"
>
  {#each shuffledArray as component}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="stick"
      class:foundAbove={isFoundAbove === component ||
      isFoundAboveLeft === component ||
      isFoundAboveRight === component
        ? isFound
        : null}
      class:foundBelow={isFoundBelow === component ||
      isFoundBelowRight === component ||
      isFoundBelowLeft === component
        ? isFound
        : null}
      class:foundLeft={isFoundLeft === component ? isFound : null}
      class:foundRight={isFoundRight === component ? isFound : null}
      class:nobita={component.class}
      style={getRandomRotation()}
      on:click={() => {
        component.class ? (isFound = true) : null;
      }}
    >
      <svelte:component this={component.name} />
    </div>
  {/each}
  <div class="illu">
    <Illustration />
  </div>
</div>

<style>
  .nobita {
    transform: rotate(var(--rotate));
    transition: all 0.8s ease-out;
    cursor: pointer;
    z-index: 10;
  }
  .stick {
    transform: rotate(var(--rotate));
    height: fit-content;
    width: fit-content;
    cursor: pointer;
    transition: all 0.8s ease-out;
  }
  .illu {
    z-index: 10;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .foundAbove {
    transform: translateY(-75px);
  }
  .foundBelow {
    transform: translateY(75px);
  }
  .foundLeft {
    transform: translateX(-75px);
  }
  .foundRight {
    transform: translateX(75px);
  }
</style>
