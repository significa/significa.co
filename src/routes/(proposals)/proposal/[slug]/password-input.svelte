<script lang="ts">
  import { Input } from '@significa/svelte-ui';

  export let error: boolean;
</script>

<form method="POST">
  <Input type="password" name="password" placeholder="Your password" {error} />
</form>
