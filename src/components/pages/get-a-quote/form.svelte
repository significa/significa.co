<script lang="ts">
  import ContactForm from '$components/contact-form.svelte';
  import clsx from 'clsx';
  import Nobita from './nobita.svelte';
  import SpeechHello from './speech-hello.svelte';
</script>

<div
  class={clsx(
    'container relative mx-auto mt-10 gap-8 overflow-hidden px-container pb-12',
    'md:mt-14 md:pb-20',
    'lg:mt-20 lg:flex lg:justify-between lg:pb-32'
  )}
>
  <div class="flex-1">
    <div class="lg:max-w-xl">
      <h1 class="text-7xl">
        Get a quote.<br />
        <span class="text-foreground-secondary">It starts here.</span>
      </h1>
    </div>
  </div>
  <div class={clsx('flex-1', 'lg:flex lg:justify-end')}>
    <div class={clsx('mt-5 w-full', 'lg:max-w-xl')}>
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
