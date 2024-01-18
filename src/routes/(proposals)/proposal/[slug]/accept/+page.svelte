<script lang="ts">
  import clsx from 'clsx';
  import Person from '$components/person.svelte';
  import { Button, toast } from '@significa/svelte-ui';
  import { t } from '$lib/i18n/index.js';
  import ProposalNavigation from '../proposal-navigation.svelte';

  export let data;

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
        toast.success({
          message: `Thank you, we will contact you soon.`
        });
      }
    } catch (error) {
      console.error(error);

      toast.error({
        message: `We were unable to get your approval. Please contact us via email.`
      });
    }
  }
</script>

<ProposalNavigation variant="accept" />

<div
  class={clsx(
    'container mx-auto px-auto min-h-[calc(100dvh-var(--topnav-height))]',
    'flex flex-col md:flex-row'
  )}
>
  <div class="px-4 py-8 md:p-12 md:border-r border-border flex-1 flex flex-col md:justify-end">
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
