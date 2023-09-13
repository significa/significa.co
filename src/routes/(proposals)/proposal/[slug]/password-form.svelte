<script lang="ts">
  import { Button, FloatingInput, Link } from '@significa/svelte-ui';
  import { t } from '$lib/i18n';

  export let error: boolean | undefined;
</script>

<div class="max-w-2xl md:mx-auto mx-5 mt-20">
  <h2 class="text-5xl">{t('proposals.password-form.title')}</h2>
  <h2 class="text-5xl text-foreground-secondary">{t('proposals.password-form.subtitle')}</h2>

  <form method="POST">
    <FloatingInput
      required
      class="mt-8"
      label={t('proposals.password-form.field.label')}
      type="password"
      name="password"
      {error}
    />
    {#if error}
      <span class="text-error block mt-1">{t('proposals.password-form.error')}</span>
    {/if}

    <div class="mt-8 flex flex-col justify-between gap-4 sm:flex-row-reverse sm:items-center">
      <Button type="submit" size="lg">{t('proposals.password-form.login')}</Button>
      <div class="text-sm">
        <p class="leading-none text-foreground-secondary">
          {t('proposals.password-form.trouble.label')}
        </p>
        <Link class="mt-0.5 inline-flex" href="mailto:{t('proposals.password-form.trouble.email')}"
          >{t('proposals.password-form.trouble.email')}</Link
        >
      </div>
    </div>
  </form>
</div>
