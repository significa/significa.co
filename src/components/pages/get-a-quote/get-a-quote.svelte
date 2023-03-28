<script lang="ts">
  import Clock from '$components/clock.svelte';
  import ContactForm from '$components/contact-form.svelte';
  import Nobita from './nobita.svelte';

  import img1 from '../../../assets/get-a-quote-1.png';
  import img2 from '../../../assets/get-a-quote-2.png';
  import img3 from '../../../assets/get-a-quote-3.png';
  import img4 from '../../../assets/get-a-quote-4.png';
  import SpeechHello from './speech-hello.svelte';

  const images = [img1, img2, img3, img4];

  const steps = [
    {
      title: 'Send us a message.',
      description: `You're at the right place. It all starts here. Use the form above to get everything started. `
    },
    {
      title: 'We will reach you in 48h.',
      description: `Unless something weird happens, like being invaded by aliens, we will get back to you in 2 working days.`
    },
    {
      title: 'Meet and proposing',
      description: `We meet. We scope. We issue a proposal. We negotiate. We discuss. We agree. We start. Simple.`
    },
    {
      title: 'Let’s collaborate!',
      description: `At this point, all the best is yet to come. We start working together and we deliver the best results. `
    }
  ];

  let y: number;
</script>

<svelte:window bind:scrollY={y} />

<div
  class="container relative mt-10 flex justify-between gap-8 overflow-hidden pb-32 md:mt-14 lg:mt-20"
>
  <div class="flex-1">
    <div class="max-w-xl">
      <h1 class="text-7xl">
        Get a quote.<br />
        <span class="text-foreground-secondary">It starts here.</span>
      </h1>
    </div>
  </div>
  <div class="flex flex-1 justify-end">
    <div class="mt-5 w-full max-w-xl">
      <div class="group">
        <ContactForm variant="quote" />
        <div
          class="absolute -bottom-[400px] left-10 drop-shadow-sm transition-all delay-200 duration-500 ease-smooth group-hover:-bottom-10"
          style="transform: rotate(-10deg)"
        >
          <Nobita />
          <SpeechHello class="absolute -top-10 -right-40" />
        </div>
      </div>
    </div>
  </div>
</div>

<div class="border-t border-border">
  <div class="container flex items-center">
    <div class="flex-1 border-r border-border py-32">
      <Clock class="w-[564px]" />
    </div>
    <div class="flex flex-1 justify-end py-32 text-4xl font-normal text-foreground-secondary">
      <div class="max-w-xl">
        <p>
          We are located in <span class="text-foreground">Porto, Portugal</span>
          and our working hours are between
          <span class="tabular-nums text-foreground">09:00</span>
          and
          <span class="tabular-nums text-foreground">18:00</span> (Europe / Lisbon).
        </p>
        <p>
          By being in a central timezone, same as London, we can easily provide overlap with both
          the US, Europe and Asia. However, experience has shown that having good asynchronous
          communication, not distance, is key to a successful partnership.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="border-t border-border">
  <div class="container flex justify-between">
    <div class="flex-1 pt-32">
      <div class="max-w-xl">
        <h3 class="text-5xl text-foreground-secondary">What's next?</h3>
        <p class="text-5xl">Get to know our process a little better.</p>
      </div>
    </div>

    <div class="-ml-px flex-1">
      <div class="h-32 border-l border-border" />
      {#each steps as step, i}
        <div
          class="relative flex justify-end border-l border-dashed border-border last:border-none"
        >
          <span
            class="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background tabular-nums"
            >{i + 1}</span
          >
          <div class="max-w-xl pb-12 text-2xl font-normal">
            <h4 class="leading-tight">{step.title}</h4>
            <p class="mt-1 leading-tight text-foreground-secondary">
              {step.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="mt-32 flex justify-center overflow-hidden border-b border-border pb-32">
  <div class="flex gap-10" style="transform: translateX({y / 10 - 200}px)">
    {#each images as img}
      <img class="h-80 w-auto" alt="" src={img} />
    {/each}
  </div>
</div>
