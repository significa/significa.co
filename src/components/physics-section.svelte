<script lang="ts">
  import type {
    PhysicsBalloonCardStoryblok,
    PhysicsInputStoryblok,
    PhysicsRectangleCardStoryblok
  } from '$types/bloks';
  import clsx from 'clsx';
  import { onMount } from 'svelte';
  import BalloonCard from './physics-blocks/balloon-card.svelte';
  import RectangleCard from './physics-blocks/rectangle-card.svelte';
  import Matter from 'matter-js';
  import PhysicsInput from './physics-blocks/physics-input.svelte';

  const INPUT_NAME = 'input' as const;

  export let items:
    | (PhysicsBalloonCardStoryblok | PhysicsRectangleCardStoryblok | PhysicsInputStoryblok)[]
    | undefined = undefined;

  // Where engine will live and use as reference
  let containerRef: HTMLElement;

  // Quantity of initial items
  let initialBoxesN = items?.length ?? 0;

  // Active engine
  let engine: Matter.Engine;

  // Limits for resize handling
  let boxGround: Matter.Body;
  let boxLeftWall: Matter.Body;
  let boxRightWall: Matter.Body;

  // Matter
  let matterInstance: typeof Matter;

  // Items where Matter will be applied
  let refs: HTMLElement[] = Array(items?.length);
  let boxes: {
    body: Matter.Body;
    elem: HTMLElement;
    render(): void;
  }[];

  /**
   * Should only react when:
   * - Items are updated (> initial)
   *   Then references are updated as a result of new items being rendered
   *   Only then we have the information needed to create a new body
   */
  $: if (items && refs && items.length === refs.length && items.length > initialBoxesN) {
    const i = items.length - 1;
    const newBox = {
      body: matterInstance.Bodies.rectangle(
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
    };

    // Update boxes
    boxes = [...boxes, newBox];

    // Add new box to active engine
    matterInstance.Composite.add(engine.world, [newBox.body]);
  }

  const getLimits = (matter: typeof Matter) => {
    // const ceil = Bodies.rectangle(containerRef.clientWidth / 2, -60, containerRef.clientWidth, 60, {
    //   isStatic: true
    // });
    const ground = matter.Bodies.rectangle(
      containerRef.clientWidth / 2,
      containerRef.clientHeight + 60 / 2,
      containerRef.clientWidth,
      60,
      { isStatic: true }
    );
    const leftWall = matter.Bodies.rectangle(
      containerRef.clientWidth + 60 / 2,
      containerRef.clientHeight / 2,
      60,
      containerRef.clientHeight,
      { isStatic: true }
    );
    const rightWall = matter.Bodies.rectangle(
      -60 / 2,
      containerRef.clientHeight / 2,
      60,
      containerRef.clientHeight,
      { isStatic: true }
    );

    return { ground, leftWall, rightWall };
  };

  const initialization = (matter: typeof Matter) => {
    const Engine = matter.Engine,
      MouseConstraint = matter.MouseConstraint,
      Mouse = matter.Mouse,
      Composite = matter.Composite,
      Bodies = matter.Bodies;

    // Create engine
    engine = Engine.create({ gravity: { scale: 0.0017 } });

    // Create boxes from current rendered items
    const initialBoxes = refs.map((_, i) => ({
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

    // Update boxes state with created boxes
    boxes = initialBoxes;

    // Limits
    const { ground, leftWall, rightWall } = getLimits(Matter);

    // Update limits state to allow resize calculation if needed
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

    // Allow page scroll when mouse is hovering canvas
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

    // Add all of the bodies and walls to the world
    Composite.add(engine.world, [
      ...initialBoxes.map((b) => b.body),
      leftWall,
      rightWall,
      //ceil,
      ground,
      mouseConstraint
    ]);

    // Main loop
    (function run() {
      boxes.forEach((box) => box.render());
      window.requestAnimationFrame(run);
      Engine.update(engine, 1000 / 60);
    })();
  };

  const handleResize = () => {
    // re-calculate limits
    const { ground, leftWall, rightWall } = getLimits(matterInstance);

    // add limits to engine
    matterInstance.Composite.add(engine.world, [ground, leftWall, rightWall]);

    // remove old limits from engine
    matterInstance.Composite.remove(engine.world, boxGround);
    matterInstance.Composite.remove(engine.world, boxLeftWall);
    matterInstance.Composite.remove(engine.world, boxRightWall);

    // update limits state as source of truth
    boxGround = ground;
    boxLeftWall = leftWall;
    boxRightWall = rightWall;
  };

  onMount(() => {
    if (items) {
      import('matter-js').then((Matter) => {
        matterInstance = Matter;
        initialization(Matter);
      });
    }
  });

  const onSubmit = (e: SubmitEvent) => {
    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    let inputValue = '';

    // get only input value
    for (const [key, value] of formData.entries()) {
      if (key === INPUT_NAME) {
        inputValue = value.toString();
      }
    }

    // clear form
    target.reset();

    // don't create block if empty
    if (inputValue !== '') {
      if (inputValue.length > 30) {
        const variant: PhysicsBalloonCardStoryblok['component'] = 'physics-balloon-card';
        const themes: PhysicsBalloonCardStoryblok['theme'][] = [
          'inverted',
          'offset',
          'panel',
          'yellow'
        ];

        const theme = themes[Math.floor(Math.random() * themes.length)];

        items = [
          ...(items || []),
          { _uid: Math.random().toString(), component: variant, theme: theme, text: inputValue }
        ];
      } else {
        const variant: PhysicsRectangleCardStoryblok['component'] = 'physics-rectangle-card';
        const themes: PhysicsRectangleCardStoryblok['theme'][] = ['transparent', 'yellow'];

        const theme = themes[Math.floor(Math.random() * themes.length)];

        items = [
          ...(items || []),
          { _uid: Math.random().toString(), component: variant, theme: theme, text: inputValue }
        ];
      }
    }
  };
</script>

<svelte:window on:resize={handleResize} />

<div bind:this={containerRef} class={clsx('relative isolate overflow-hidden', $$restProps.class)}>
  {#if items}
    {#each items as item, i}
      {#if item.component === 'physics-balloon-card'}
        <BalloonCard block={item} bind:ref={refs[i]} class={clsx('absolute w-fit')} />
      {:else if item.component === 'physics-rectangle-card'}
        <RectangleCard block={item} bind:ref={refs[i]} class={clsx('absolute w-fit')} />
      {:else if item.component === 'physics-input'}
        <form on:submit|preventDefault={onSubmit} id={i + item._uid}>
          <PhysicsInput
            name={INPUT_NAME}
            form={i + item._uid}
            block={item}
            bind:ref={refs[i]}
            class={clsx('absolute w-fit')}
          />
        </form>
      {/if}
    {/each}
  {/if}
</div>
