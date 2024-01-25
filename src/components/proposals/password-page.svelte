<script lang="ts">
  import { Button, FloatingInput } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';
  import ProposalNavigation from '$components/proposals/proposal-navigation.svelte';

  export let error: boolean | undefined;
</script>

<ProposalNavigation />

<div
  class="container flex items-center xs:mx-auto w-full justify-left xs:justify-center h-[calc(100dvh-var(--topnav-height))] px-container"
>
  <div class="max-w-lg xs:max-w-xl xs:mx-auto -mt-[--topnav-height] w-full">
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
          <span class="text-error block mt-1">{t('proposals.password-form.error')}</span>
        {/if}
      </div>

      <Button class=" mt-5" type="submit" size="md">{t('proposals.password-form.login')}</Button>
    </form>
  </div>
</div>
