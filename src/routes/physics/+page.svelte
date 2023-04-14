<script lang="ts">
  import { Engine, Render, Mouse, MouseConstraint, Bodies, Composite } from 'matter-js';
  import { onMount } from 'svelte';

  let containerRef: HTMLElement;
  let boxARef: HTMLElement;
  let boxBRef: HTMLElement;

  const animate = () => {
    // create an engine
    const engine = Engine.create();

    //TODO: Remove Renderer
    // create a renderer
    // const render = Render.create({
    //   element: containerRef,
    //   options: { width: containerRef.clientWidth, height: containerRef.clientHeight },
    //   engine: engine
    // });

    // create two boxes and a ground
    const boxA = {
      body: Bodies.rectangle(400, 200, boxARef.clientWidth, boxARef.clientHeight),
      elem: boxARef,
      render() {
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - boxARef.clientHeight / 2}px`;
        this.elem.style.left = `${x - boxARef.clientWidth / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      }
    };
    const boxB = {
      body: Bodies.rectangle(450, 50, boxBRef.clientWidth, boxBRef.clientHeight),
      elem: boxBRef,
      render() {
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - boxBRef.clientHeight / 2}px`;
        this.elem.style.left = `${x - boxBRef.clientWidth / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      }
    };

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

    // add all of the bodies to the world
    Composite.add(engine.world, [
      boxA.body,
      boxB.body,
      leftWall,
      rightWall,
      ground,
      mouseConstraint
    ]);

    //TODO: Remove Renderer
    // run the renderer
    //Render.run(render);

    (function run() {
      boxA.render();
      boxB.render();
      window.requestAnimationFrame(run);
      Engine.update(engine, 1000 / 60);
    })();
  };

  onMount(() => {
    animate();
  });
</script>

<section class="overflow-hidden border-y">
  <div
    bind:this={containerRef}
    class="container relative isolate mx-auto h-[1024px] bg-background-panel "
  >
    <div bind:this={boxARef} class="absolute inset-0 h-[180px] w-[80px] bg-white" />
    <div bind:this={boxBRef} class="absolute inset-0 h-[180px] w-[80px] bg-white" />
  </div>
</section>

<style>
  :global(canvas) {
    opacity: 0.5;
  }
</style>
