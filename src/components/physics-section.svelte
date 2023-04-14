<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import type { PhysicsBalloonCardStoryblok, PhysicsRectangleCardStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import { onMount } from 'svelte';

  export let items: (PhysicsBalloonCardStoryblok | PhysicsRectangleCardStoryblok)[] | undefined =
    undefined;

  let refs: HTMLElement[] = Array(items?.length);
  let containerRef: HTMLElement;

  const animate = () => {
    if (items) {
      import('matter-js').then((Matter) => {
        const Engine = Matter.Engine,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          Composite = Matter.Composite,
          Bodies = Matter.Bodies;

        const engine = Engine.create();

        const boxes = refs.map((_, i) => ({
          body: Bodies.rectangle(0, 0, refs[i].clientWidth, refs[i].clientHeight, {
            friction: 1
          }),
          elem: refs[i],
          render() {
            const { x, y } = this.body.position;
            this.elem.style.top = `${y - refs[i].clientHeight / 2}px`;
            this.elem.style.left = `${x - refs[i].clientWidth / 2}px`;
            this.elem.style.transform = `rotate(${this.body.angle}rad)`;
          }
        }));

        const ground = Bodies.rectangle(
          containerRef.clientWidth / 2,
          containerRef.clientHeight + 60 / 2,
          containerRef.clientWidth,
          64,
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

        //TODO: Remove Renderer use dom element
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

        //TODO: Remove Renderer
        // run the renderer
        //Render.run(render);

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

  const parseTheme = (variant: PhysicsBalloonCardStoryblok['theme']) => {
    if (variant === 'inverted') {
      if ($theme === 'light') return 'dark';
      else if ($theme === 'dark') return 'light';
    } else if (variant === 'yellow') {
      return 'yellow';
    } else return;
  };
</script>

<div bind:this={containerRef} class={clsx('relative isolate overflow-hidden', $$restProps.class)}>
  {#if items}
    {#each items as item, i}
      {#if item.component === 'physics-balloon-card'}
        <div
          bind:this={refs[i]}
          data-theme={parseTheme(item.theme)}
          class={clsx(
            'min-w-xs w-xs absolute max-w-xs select-none rounded-xs p-4',
            (item.theme === 'inverted' || item.theme === 'yellow') && 'bg-background',
            item.theme === 'panel' && 'bg-background-panel',
            item.theme === 'offset' && 'bg-background-offset'
          )}
        >
          <p class="text-xl">{item.text}</p>
        </div>
      {:else if item.component === 'physics-rectangle-card'}
        <div
          bind:this={refs[i]}
          data-theme={item.theme === 'yellow' ? 'yellow' : undefined}
          class="absolute select-none whitespace-nowrap border-[1px] border-foreground-secondary p-3"
        >
          <p class="text-3xl font-bold">{item.text}</p>
        </div>
      {/if}
    {/each}
  {/if}
</div>
