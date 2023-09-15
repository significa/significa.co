<script lang="ts">
  import { onMount } from 'svelte';
  import { device } from '$lib/stores/device';
  import clsx from 'clsx';
  import { getScrollSpeed } from '$lib/utils/dom';
  import BalloonCard from './physics-blocks/balloon-card.svelte';
  import RectangleCard from './physics-blocks/rectangle-card.svelte';
  import PhysicsInput from './physics-blocks/physics-input.svelte';
  import type Matter from 'matter-js';
  import type {
    PhysicsBalloonCardStoryblok,
    PhysicsInputStoryblok,
    PhysicsRectangleCardStoryblok,
    PhysicsStickerStoryblok
  } from '$types/bloks';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { Engine, Body } from 'matter-js';

  const INPUT_NAME = 'input' as const;
  const GRAVITY_DEFAULT_VALUE = 0.0017 as const;

  export let items:
    | (
        | PhysicsBalloonCardStoryblok
        | PhysicsRectangleCardStoryblok
        | PhysicsInputStoryblok
        | PhysicsStickerStoryblok
      )[]
    | undefined = undefined;

  // Where engine will live and use as reference
  let containerRef: HTMLElement;

  // Quantity of initial items
  let initialBoxesN = items?.length ?? 0;
  let currentBodies = 0;
  let recalc = false;

  $: if (recalc && currentBodies > 0) {
    const newBoxes = getBoxes(matterInstance);

    // add limits to engine
    matterInstance.Composite.add(engine.world, [
      ...newBoxes.filter((bx) => bx !== null).map((b) => b!.body)
    ]);

    // remove old boxes from engine
    boxes
      .filter((bx) => bx !== null)
      .forEach((box) => matterInstance.Composite.remove(engine.world, box!.body));

    // update boxes state as source of truth
    boxes = newBoxes;
    recalc = false;
  }

  // Active engine
  let engine: Engine;
  let isAddingBox: boolean;

  // Limits for resize handling
  let boxGround: Body;
  let boxLeftWall: Body;
  let boxRightWall: Body;

  // Matter
  let matterInstance: typeof Matter;

  // Items where Matter will be applied
  let refs: HTMLElement[] = Array(items?.length);
  let boxes: ({
    body: Body;
    elem: HTMLElement;
    render(): void;
  } | null)[];

  /**
   * Should only react when:
   * - Items are updated (> initial)
   *   Then references are updated as a result of new items being rendered
   *   Only then we have the information needed to create a new body
   */
  $: if (
    items &&
    refs &&
    items.length === refs.length &&
    items.length > initialBoxesN &&
    items.map((i) => i.component).includes('physics-input') &&
    isAddingBox
  ) {
    isAddingBox = false;

    const i = items.length - 1;

    if (refs[i]) {
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
  }

  const getBoxes = (matter: typeof Matter) => {
    // Create boxes from current rendered items
    const boxes = refs.map((boxRef) => {
      if (getComputedStyle(boxRef).display === 'block') {
        return {
          body: matter.Bodies.rectangle(
            containerRef.clientWidth * Math.random(),
            containerRef.clientHeight / 2 - boxRef.clientHeight,
            boxRef.clientWidth,
            boxRef.clientHeight,
            {
              friction: 1
            }
          ),
          elem: boxRef,
          render() {
            if (boxRef?.clientHeight && boxRef?.clientWidth) {
              const { x, y } = this.body.position;
              this.elem.style.top = `${y - boxRef.clientHeight / 2}px`;
              this.elem.style.left = `${x - boxRef.clientWidth / 2}px`;
              this.elem.style.transform = `rotate(${this.body.angle}rad)`;
            }
          }
        };
      } else {
        return null;
      }
    });

    return boxes;
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

    // Create boxes from current rendered items
    const initialBoxes = getBoxes(matter);

    // Update boxes state with created boxes
    boxes = initialBoxes;

    // Limits
    const { ground, leftWall, rightWall, ceil } = getLimits(matter);

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
      ...initialBoxes.filter((bx) => bx !== null).map((b) => b!.body),
      leftWall,
      rightWall,
      ceil,
      ground,
      mouseConstraint
    ]);

    currentBodies = refs?.filter((ref) => getComputedStyle(ref).display === 'block').length || 0;

    // Main loop
    (function run() {
      boxes.forEach((box) => box?.render());
      window.requestAnimationFrame(run);
      Engine.update(engine, 1000 / 60);
    })();
  };

  const handleResize = () => {
    const prevCurrent = currentBodies;

    if (
      prevCurrent !== (refs?.filter((ref) => getComputedStyle(ref).display === 'block').length || 0)
    ) {
      currentBodies = refs?.filter((ref) => getComputedStyle(ref).display === 'block').length || 0;
      recalc = true;
    }

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

  // Touch devices behaved badly with element drag so we do a small gravity effect on scroll instead
  const handleTouchDeviceScroll = () => {
    if ($device === 'touch') {
      engine.gravity = {
        x: 0,
        y: 1,
        scale: getScrollSpeed() <= 2 ? GRAVITY_DEFAULT_VALUE : -0.0013
      };

      // prevent negative gravity being stuck
      setTimeout(() => {
        engine.gravity = {
          x: 0,
          y: 1,
          scale: GRAVITY_DEFAULT_VALUE
        };
      }, 250);
    }
  };

  // Handle element creation by input
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

        isAddingBox = true;
      } else {
        const variant: PhysicsRectangleCardStoryblok['component'] = 'physics-rectangle-card';
        const themes: PhysicsRectangleCardStoryblok['theme'][] = ['transparent', 'yellow'];

        const theme = themes[Math.floor(Math.random() * themes.length)];

        items = [
          ...(items || []),
          { _uid: Math.random().toString(), component: variant, theme: theme, text: inputValue }
        ];
        isAddingBox = true;
      }
    }
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

<svelte:window on:resize={handleResize} on:scroll={handleTouchDeviceScroll} />

<div
  bind:this={containerRef}
  class={clsx('relative isolate overflow-hidden', $$restProps.class)}
  style={$$restProps.style}
>
  {#if items}
    {#each items as item, i}
      {#if item.component === 'physics-balloon-card'}
        <BalloonCard
          block={item}
          bind:ref={refs[i]}
          class={clsx(
            'absolute w-fit',
            !engine && 'invisible',
            item.is_desktop_only && 'hidden md:block'
          )}
        />
      {:else if item.component === 'physics-rectangle-card'}
        <RectangleCard
          block={item}
          bind:ref={refs[i]}
          class={clsx(
            'absolute w-fit',
            !engine && 'invisible',
            item.is_desktop_only && 'hidden md:block'
          )}
        />
      {:else if item.component === 'physics-input'}
        <form on:submit|preventDefault={onSubmit} id={i + item._uid}>
          <PhysicsInput
            name={INPUT_NAME}
            form={i + item._uid}
            block={item}
            bind:ref={refs[i]}
            class={clsx(
              'absolute w-fit',
              !engine && 'invisible',
              item.is_desktop_only && 'hidden md:block'
            )}
          />
        </form>
      {:else if item.component === 'physics-sticker' && item.photo}
        {@const { width, height, src, alt } = getImageAttributes(item.photo)}
        <img
          bind:this={refs[i]}
          class={clsx(
            'absolute select-none drop-shadow-md',
            !engine && 'invisible',
            item.is_desktop_only && 'hidden md:block'
          )}
          {src}
          {alt}
          width={+width / 2}
          height={+height / 2}
          draggable="false"
        />
      {/if}
    {/each}
  {/if}
</div>
