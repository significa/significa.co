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
  import { onMount } from 'svelte';

  const components = [
    { name: Nobita, class: 'nobita' },
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

  let screenWidth: number;
  let screenHeight: number;
  let colNum: number;
  let isFoundAbove: any;
  let isFoundAboveLeft: any;
  let isFoundAboveRight: any;
  let isFoundBelow: any;
  let isFoundBelowLeft: any;
  let isFoundBelowRight: any;
  let isFoundLeft: any;
  let isFoundRight: any;
  let shuffledArray: any;

  const getRandomRotation = () => {
    return `--rotate:${Math.floor(Math.random() * 180)}deg;margin-top: -100px;`;
  };

  onMount(() => {
    colNum = Math.floor(screenWidth / 100);
    shuffledArray = components.sort(() => 0.5 - Math.random());

    const nobitaIndex = shuffledArray.map((el: any) => el.class).indexOf('nobita');
    const colMiddle = Math.floor(colNum / 2);
    const rowNum = 6;

    const itemsOnScreen = colNum * rowNum;
    const isNobitaFirstRow = nobitaIndex < colNum;
    const isNobitaLastRow = nobitaIndex > itemsOnScreen - colNum;
    const isNobitaHidden =
      (!isNobitaFirstRow && !isNobitaLastRow && (nobitaIndex % colNum) + 1 === colMiddle) ||
      (!isNobitaFirstRow && !isNobitaLastRow && (nobitaIndex % colNum) + 1 === colMiddle + 1) ||
      (!isNobitaFirstRow && !isNobitaLastRow && (nobitaIndex % colNum) + 1 === colMiddle - 1) ||
      (!isNobitaFirstRow && !isNobitaLastRow && (nobitaIndex % colNum) + 1 === colMiddle - 2) ||
      (!isNobitaFirstRow && !isNobitaLastRow && (nobitaIndex % colNum) + 1 === colMiddle + 2);
    if (isNobitaHidden) {
      shuffledArray.splice(nobitaIndex, 1);
      shuffledArray = [{ name: Nobita, class: 'nobita' }, ...shuffledArray];
    }

    const isNobitaLeftScreenEdge = nobitaIndex % colNum === 0;
    const isNobitaRightScreenEdge = nobitaIndex % colNum === colNum - 1;

    isFoundAbove = shuffledArray[nobitaIndex - colNum];
    isFoundAboveLeft =
      !isNobitaLeftScreenEdge && !isNobitaRightScreenEdge
        ? shuffledArray[nobitaIndex - colNum + 1]
        : null;
    isFoundAboveRight = !isNobitaRightScreenEdge ? shuffledArray[nobitaIndex - colNum - 1] : null;
    isFoundBelow = shuffledArray[nobitaIndex + colNum];
    isFoundBelowLeft =
      !isNobitaLeftScreenEdge && !isNobitaRightScreenEdge
        ? shuffledArray[nobitaIndex + colNum - 1]
        : null;
    isFoundBelowRight = !isNobitaRightScreenEdge ? shuffledArray[nobitaIndex + colNum + 1] : null;
    isFoundLeft = !isNobitaLeftScreenEdge ? shuffledArray[nobitaIndex - 1] : null;
    isFoundRight = !isNobitaRightScreenEdge ? shuffledArray[nobitaIndex + 1] : null;
  });

  let isFound = false;
</script>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} />
<div
  style={`--columnsNum:${Math.floor(screenWidth / 100)};padding-top: 100px; padding-left: -50px;`}
  class="columns fixed grid h-full w-full overflow-hidden"
>
  {#if shuffledArray}
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
  {/if}
  <div class="illu">
    <Illustration />
  </div>
</div>

<style>
  .nobita {
    transform: rotate(var(--rotate));
    transition: all 0.8s ease-out;
    cursor: pointer;
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
  .columns {
    grid-template-columns: repeat(var(--columnsNum), minmax(0, 1fr));
  }
</style>
