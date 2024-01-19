<script lang="ts">
  import clsx from 'clsx';
  import Person from '$components/person.svelte';
  import { Button, toast } from '@significa/svelte-ui';
  import { t } from '$lib/i18n/index.js';
  import { fly } from 'svelte/transition';
  import { circOut } from 'svelte/easing';
  import { Confetti } from 'svelte-confetti';
  import { CONFETTI_COLOR_ARRAY } from '$lib/constants';
  import SuccessEgg from './eggs/success.svg?raw';

  import ProposalNavigation from '../proposal-navigation.svelte';

  // type Eggs = 'error' | 'success';
  // const files = import.meta.glob('./eggs/*.svg', { as: 'raw', eager: true });
  // const eggs = Object.entries(files).reduce(
  //   (acc, [path, file]) => {
  //     const name = path.replace('./eggs/', '').replace('.svg', '') as Eggs;
  //     acc[name] = file;
  //     return acc;
  //   },
  //   {} as Record<Eggs, string>
  // );

  export let data;

  let result: 'success' | undefined;

  const proposal = data?.story?.content;

  async function approveProposal() {
    try {
      const response = await fetch('/proposal', {
        method: 'POST',
        body: JSON.stringify({ client: proposal?.client, title: proposal?.title }),
        headers: {
          'content-type': 'application/json'
        }
      });

      if (response.ok) {
        result = 'success';
      }
    } catch (error) {
      console.error(error);

      toast.error({
        message: t('proposals.accept.error')
      });
    }
  }
</script>

{#if result === 'success'}
  <div
    class="pointer-events-none fixed left-0 top-0 flex h-screen w-screen justify-center overflow-hidden"
  >
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[0, 2000]}
      amount="200"
      fallDistance="100vh"
      colorArray={CONFETTI_COLOR_ARRAY}
    />
  </div>
{/if}

<ProposalNavigation variant="accept" />

<div
  class={clsx(
    'container mx-auto px-auto h-[calc(100dvh-var(--topnav-height))]',
    'flex flex-col md:flex-row'
  )}
>
  <div class="px-4 py-8 md:p-12 md:border-r border-border flex-1 flex flex-col md:justify-end">
    {#if result}
      <div
        transition:fly|global={{ y: -250, opacity: 0, easing: circOut, duration: 250, delay: 500 }}
      >
        <!-- eslint-disable svelte/no-at-html-tags -->
        {@html SuccessEgg}
      </div>
    {/if}

    <h2 class="text-4xl">{t('proposals.accept.title')}</h2>
    <h2 class="text-4xl text-foreground-secondary">
      {t('proposals.accept.subtitle')}
    </h2>

    <div class="mt-12 flex flex-col md:flex-row justify-between">
      <div>
        <p>{t('proposals.accept.secondary-title')}</p>
        <p class="text-foreground-secondary">{t('proposals.accept.secondary-subtitle')}</p>
      </div>

      <Button variant="primary" class="mt-6 md:mt-0" on:click={approveProposal}
        >{t('proposals.accept.button')}</Button
      >
    </div>
  </div>

  <div
    class="px-4 py-8 md:p-12 border-t border-border md:border-t-0 flex-1 flex flex-col md:justify-end"
  >
    <h2 class="text-4xl">{t('proposals.accept.contact.title')}</h2>
    <h2 class="text-4xl text-foreground-secondary">{t('proposals.accept.contact.subtitle')}</h2>

    {#if proposal?.created_by?.content?.email}
      <div class="mt-12 flex flex-col md:flex-row justify-between">
        <Person
          name={proposal?.created_by.name}
          photo={proposal?.created_by.content.photo}
          email={proposal?.created_by.content.email}
        />

        <Button
          variant="secondary"
          class="mt-6 md:mt-0"
          as="a"
          href="mailto:{proposal?.created_by.content.email}"
          >{t('proposals.accept.contact.button')}</Button
        >
      </div>
    {/if}
  </div>
</div>
