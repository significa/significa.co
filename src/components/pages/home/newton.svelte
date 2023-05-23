<script lang="ts">
  import { onMount } from 'svelte';
  import clsx from 'clsx';
  import type Matter from 'matter-js';
  import type { Engine, Body, Constraint } from 'matter-js';
  import Strategy from './assets/strategy.webp';
  import Design from './assets/design.webp';
  import Dev from './assets/dev.webp';

  const GRAVITY_DEFAULT_VALUE = 0.0017 as const;
  const items = [Strategy, Design, Dev];

  // Store all coords to calc slope
  let referenceCoords: { x: number; y: number }[] = Array(items.length);

  // Where engine will live and use as reference
  let containerRef: HTMLElement;

  // Active engine
  let engine: Engine;

  // Limits for resize handling
  let boxGround: Body;
  let boxLeftWall: Body;
  let boxRightWall: Body;

  // Matter
  let matterInstance: typeof Matter;

  // Items where Matter will be applied
  let refs: HTMLElement[] = Array(items?.length);

  // Active bodies
  let currentBoxes: {
    body: Body;
    elem: HTMLElement;
    render(): void;
  }[];
  let currentConstrains: Constraint[];

  // To 9th grade self: you'll use trigonometry in your job :)
  const getDegFromCathetus = (x: number, y: number) => Math.atan2(x, y) * (180 / Math.PI);

  // function to place all boxes and constraints to the engine
  const getContent = (matter: typeof Matter) => {
    // Create boxes from current rendered items
    const boxes = refs.map((_, i) => ({
      body: matter.Bodies.rectangle(
        containerRef.clientWidth / 4 + (containerRef.clientWidth / 4) * i,
        containerRef.clientHeight / 2 - refs[i].clientHeight,
        refs[i].clientWidth,
        refs[i].clientHeight,
        {
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0
        }
      ),
      elem: refs[i],
      render() {
        if (refs?.[i]?.clientHeight && refs?.[i]?.clientWidth) {
          const { x, y } = this.body.position;
          this.elem.style.top = `${y - refs[i].clientHeight / 2}px`;
          this.elem.style.left = `${x - refs[i].clientWidth / 2}px`;

          referenceCoords[i] = {
            x: containerRef.clientWidth / 4 + (containerRef.clientWidth / 4) * i - x,
            y
          };
        }
      }
    }));

    // create anchors on the top of the box as a pivot
    const anchors = refs.map((_, i) => ({
      body: matter.Bodies.rectangle(
        containerRef.clientWidth / 4 + (containerRef.clientWidth / 4) * i, // 25% + 25% * i
        0,
        refs[i].clientWidth,
        refs[i].clientHeight,
        {
          friction: 0,
          isStatic: true
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

    // bind anchors and boxes
    const constraints = refs.map((_, i) =>
      matter.Constraint.create({
        bodyA: boxes[i].body,
        bodyB: anchors[i].body,
        length: containerRef.clientHeight / 2
      })
    );

    return { boxes, constraints };
  };

  const getLimits = (matter: typeof Matter) => {
    const ceil = matter.Bodies.rectangle(
      containerRef.clientWidth / 2,
      -60 / 2,
      containerRef.clientWidth,
      60,
      {
        isStatic: true,
        friction: 1
      }
    );
    const ground = matter.Bodies.rectangle(
      containerRef.clientWidth / 2,
      containerRef.clientHeight + 60 / 2,
      containerRef.clientWidth,
      64,
      { isStatic: true, friction: 1 }
    );
    const leftWall = matter.Bodies.rectangle(
      containerRef.clientWidth + 60 / 2,
      containerRef.clientHeight / 2,
      60,
      containerRef.clientHeight,
      { isStatic: true, friction: 1 }
    );
    const rightWall = matter.Bodies.rectangle(
      -60 / 2,
      containerRef.clientHeight / 2,
      60,
      containerRef.clientHeight,
      { isStatic: true, friction: 1 }
    );

    return { ground, leftWall, rightWall, ceil };
  };

  const initialization = (matter: typeof Matter) => {
    const Engine = matter.Engine,
      MouseConstraint = matter.MouseConstraint,
      Mouse = matter.Mouse,
      Composite = matter.Composite;

    // Create engine
    engine = Engine.create({ gravity: { scale: GRAVITY_DEFAULT_VALUE } });

    const { boxes, constraints } = getContent(matter);
    const { ground, leftWall, rightWall, ceil } = getLimits(matter);

    // Update state to allow resize calculation if needed
    currentBoxes = boxes;
    currentConstrains = constraints;
    boxGround = ground;
    boxLeftWall = leftWall;
    boxRightWall = rightWall;

    // Mouse Constraints
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

    // This looks hideous but it's really needed
    // Allow page scroll when mouse is hovering canvas or touch device is interacting
    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mouseConstraint.mouse as any).mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mouseConstraint.mouse as any).mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      'touchstart',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mouseConstraint.mouse as any).mousedown
    );
    mouseConstraint.mouse.element.removeEventListener(
      'touchmove',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mouseConstraint.mouse as any).mousemove
    );
    mouseConstraint.mouse.element.removeEventListener(
      'touchend',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mouseConstraint.mouse as any).mouseup
    );

    // Add all of the bodies and walls to the world
    Composite.add(engine.world, [
      ...boxes.map((b) => b.body),
      ...constraints,
      leftWall,
      rightWall,
      ceil,
      ground,
      mouseConstraint
    ]);

    // Main loop
    (function run() {
      currentBoxes.forEach((box) => box.render());
      window.requestAnimationFrame(run);
      Engine.update(engine, 1000 / 60);
    })();
  };

  const handleResize = () => {
    // re-calculate all items
    const { ground, leftWall, rightWall } = getLimits(matterInstance);
    const { boxes, constraints } = getContent(matterInstance);

    // add limits to engine
    matterInstance.Composite.add(engine.world, [
      ...boxes.map((b) => b.body),
      ...constraints,
      ground,
      leftWall,
      rightWall
    ]);

    // remove old items from engine
    matterInstance.Composite.remove(engine.world, boxGround);
    matterInstance.Composite.remove(engine.world, boxLeftWall);
    matterInstance.Composite.remove(engine.world, boxRightWall);
    currentBoxes.forEach((box) => matterInstance.Composite.remove(engine.world, box.body));
    currentConstrains.forEach((c) => matterInstance.Composite.remove(engine.world, c));

    // update limits state as source of truth
    boxGround = ground;
    boxLeftWall = leftWall;
    boxRightWall = rightWall;
    currentBoxes = boxes;
    currentConstrains = constraints;
  };

  onMount(() => {
    if (items) {
      import('matter-js').then((Matter) => {
        matterInstance = Matter;
        initialization(Matter);
      });
    }
  });
</script>

<svelte:window on:resize={handleResize} />

<div
  bind:this={containerRef}
  class={clsx('relative isolate aspect-square w-full', $$restProps.class)}
  style={$$restProps.style}
>
  {#if items}
    {#each items as _, i}
      <div
        class={clsx(
          'absolute h-1/2 w-1 origin-top bg-background-offset',
          i === 0 && 'left-1/4', //25%
          i === 1 && 'left-1/2', //50%
          i === 2 && 'left-3/4' //75%
        )}
        style="transform: rotate({getDegFromCathetus(
          referenceCoords[i]?.x,
          referenceCoords[i]?.y
        )}deg)"
      />
      <div bind:this={refs[i]} class="absolute aspect-square h-auto w-1/4">
        <img
          width="167"
          height="167"
          src={items[i]}
          alt=""
          class="h-full select-none object-contain drop-shadow-md"
          draggable="false"
        />
      </div>
    {/each}
  {/if}
</div>
