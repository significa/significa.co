<script lang="ts">
  import { Button, FloatingInput } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';
  import ProposalNavigation from '$components/proposals/proposal-navigation.svelte';

  export let error: boolean | undefined;
</script>

<ProposalNavigation />

<div
  class="justify-left container flex h-[calc(100dvh-var(--topnav-height))] w-full items-center px-container xs:mx-auto xs:justify-center"
>
  <div class="-mt-[--topnav-height] w-full max-w-lg xs:mx-auto xs:max-w-xl">
    <h2 class="text-5xl">{t('proposals.password-form.title')}</h2>
    <h2 class="text-5xl text-foreground-secondary">{t('proposals.password-form.subtitle')}</h2>

    <form method="POST" class="relative mt-8 xs:mt-10">
      <div class="flex-1">
        <FloatingInput
          required
          label={t('proposals.password-form.field.label')}
          type="password"
          name="password"
          {error}
        />
        {#if error}
          <span class="mt-1 block text-error">{t('proposals.password-form.error')}</span>
        {/if}
      </div>

      <Button class=" mt-5" type="submit" size="md">{t('proposals.password-form.login')}</Button>
    </form>
  </div>
</div>
