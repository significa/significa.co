<script lang="ts">
  import clsx from 'clsx';
  import { page } from '$app/stores';
  import Person from '$components/person.svelte';
  import { Button, Logo, toast } from '@significa/svelte-ui';

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

<div class="h-[--topnav-height] border-b border-b-border">
  <div class="container mx-auto px-container flex items-center justify-between py-4">
    <Logo class="mt-1" variant="wordmark" />

    <Button variant="ghost" icon="close" as="a" href={$page.url.pathname.replace('/accept', '')} />
  </div>
</div>
<div
  class={clsx(
    'container mx-auto px-auto min-h-[calc(100dvh-var(--topnav-height))]',
    'flex flex-col md:flex-row'
  )}
>
  <div class="px-4 py-8 md:p-12 md:border-r border-border flex flex-col md:justify-end">
    <h2 class="text-4xl">Accept Proposal.</h2>
    <h2 class="text-4xl text-foreground-secondary">
      Quick meetings to discuss the following proposal.
    </h2>

    <div class="mt-12 flex flex-col md:flex-row justify-between">
      <div>
        <p class="">This is something</p>
        <p class="text-foreground-secondary">Something to say about this proposal.</p>
      </div>

      <Button variant="primary" class="mt-6 md:mt-0" on:click={approveProposal}
        >Accept Proposal</Button
      >
    </div>
  </div>

  <div class="px-4 py-8 md:p-12 border-t border-border md:border-t-0 flex flex-col md:justify-end">
    <h2 class="text-4xl">Contact us.</h2>
    <h2 class="text-4xl text-foreground-secondary">
      Reply to us by email to discuss the following proposal.
    </h2>

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
        href="mailto:{proposal?.created_by.content.email}">Contact us</Button
      >
    </div>
  </div>
</div>
