<script lang="ts">
  import clsx from 'clsx';
  import { Button, toast } from '@significa/svelte-ui';
  import { t } from '$lib/i18n/index.js';
  import { fly } from 'svelte/transition';
  import { circOut } from 'svelte/easing';
  import { Confetti } from 'svelte-confetti';
  import { CONFETTI_COLOR_ARRAY } from '$lib/constants';
  import SuccessEgg from './eggs/success.svelte';
  import { truncateText } from '$lib/utils/strings';

  import Person from '$components/person.svelte';
  import ProposalNavigation from '$components/proposals/proposal-navigation.svelte';

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
        class="relative"
        transition:fly|global={{ y: -250, opacity: 0, easing: circOut, duration: 250, delay: 500 }}
      >
        <SuccessEgg />
        <div
          class={clsx(
            'absolute left-[170px] top-[25px] line-clamp-2 flex h-[76px] w-36 z-10',
            'items-center justify-center text-center font-comic text-black font-bold leading-snug'
          )}
        >
          <div class="h-fit w-28">
            Thank you, {truncateText(proposal?.client || '', 16)}
          </div>
        </div>
      </div>
    {/if}

    <h2 class="text-4xl">{t('proposals.accept.title')}</h2>
    <h2 class="text-4xl text-foreground-secondary">
      {t('proposals.accept.subtitle')}
    </h2>

    <div class="mt-12 flex flex-col md:flex-row justify-between">
      <div>
        <p class="font-semibold">{t('proposals.accept.secondary-title')}</p>
        <p class="font-semibold text-foreground-secondary">
          {t('proposals.accept.secondary-subtitle')}
        </p>
      </div>

      <Button
        variant="primary"
        disabled={result === 'success'}
        class="mt-6 md:mt-0"
        on:click={approveProposal}>{t('proposals.accept.button')}</Button
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
          href="mailto:{proposal?.created_by.content
            .email}?subject={proposal?.title}. Discussion about Significa proposal"
          >{t('proposals.accept.contact.button', {
            name: proposal?.created_by.name.split(' ')[0]
          })}</Button
        >
      </div>
    {/if}
  </div>
</div>
