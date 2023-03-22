<script lang="ts">
  import { FloatingInput, FloatingTextarea } from '@significa/svelte-ui';
  import FormFooter from './form-footer.svelte';

  let name = '';
  let email = '';
  let message = '';
</script>

<form method="POST" action="/contact">
  <div class="flex flex-col gap-4">
    <div class="flex w-full flex-col gap-4 md:flex-row">
      <FloatingInput class="w-full" label="Name" bind:value={name} />
      <FloatingInput class="w-full" label="Email address" bind:value={email} />
    </div>
    <FloatingTextarea class="flex w-full" label="Message" bind:value={message} />
  </div>
  <FormFooter />
</form>
