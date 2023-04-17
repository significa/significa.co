<script lang="ts">
  import type { PhysicsBalloonCardStoryblok, PhysicsRectangleCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import BalloonCard from './physics-blocks/balloon-card.svelte';
  import RectangleCard from './physics-blocks/rectangle-card.svelte';
  import type { Engine } from 'matter-js';

  export let items: (PhysicsBalloonCardStoryblok | PhysicsRectangleCardStoryblok)[] | undefined =
    undefined;

  let refs: HTMLElement[] = Array(items?.length);
  let containerRef: HTMLElement;
  let engine: Engine;

  const animate = () => {
    if (items) {
      import('matter-js').then((Matter) => {
        const Engine = Matter.Engine,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies;

        engine = Engine.create({ gravity: { scale: 0.0017 } });

        const boxes = refs.map((_, i) => ({
          body: Bodies.rectangle(
            containerRef.clientWidth / 2 - refs[i].clientWidth / 2,
            refs[i].clientHeight / 2,
            refs[i].clientWidth,
            refs[i].clientHeight,
            {
              friction: 1
            }
          ),
          elem: refs[i],
          render() {
            const { x, y } = this.body.position;
            this.elem.style.top = `${y - refs[i].clientHeight / 2}px`;
            this.elem.style.left = `${x - refs[i].clientWidth / 2}px`;
            this.elem.style.transform = `rotate(${this.body.angle}rad)`;
          }
        }));

        // Walls and ground
        const ground = Bodies.rectangle(
          containerRef.clientWidth / 2,
          containerRef.clientHeight + 60 / 2,
          containerRef.clientWidth,
          60,
          { isStatic: true }
        );
        const leftWall = Bodies.rectangle(
          containerRef.clientWidth + 60 / 2,
          containerRef.clientHeight / 2,
          60,
          containerRef.clientHeight,
          { isStatic: true }
        );
        const rightWall = Bodies.rectangle(
          -60 / 2,
          containerRef.clientHeight / 2,
          60,
          containerRef.clientHeight,
          { isStatic: true }
        );

        const mouse = Mouse.create(containerRef),
          mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
              stiffness: 0.2,
              render: {
                visible: false
              }
            }
          });

        mouseConstraint.mouse.element.removeEventListener(
          'mousewheel',
          // @ts-ignore
          mouseConstraint.mouse.mousewheel
        );
        mouseConstraint.mouse.element.removeEventListener(
          'DOMMouseScroll',
          // @ts-ignore
          mouseConstraint.mouse.mousewheel
        );

        // add all of the bodies to the world
        Composite.add(engine.world, [
          ...boxes.map((b) => b.body),
          leftWall,
          rightWall,
          ground,
          mouseConstraint
        ]);

        (function run() {
          boxes.forEach((box) => box.render());
          window.requestAnimationFrame(run);
          Engine.update(engine, 1000 / 60);
        })();
      });
    }
  };

  onMount(() => {
    animate();
  });
</script>

<div bind:this={containerRef} class={clsx('relative isolate overflow-hidden', $$restProps.class)}>
  {#if items}
    {#each items as item, i}
      {#if item.component === 'physics-balloon-card'}
        <BalloonCard block={item} bind:ref={refs[i]} class={clsx('absolute w-fit')} />
      {:else if item.component === 'physics-rectangle-card'}
        <RectangleCard block={item} bind:ref={refs[i]} class={clsx('absolute w-fit')} />
      {/if}
    {/each}
  {/if}
</div>
