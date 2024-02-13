<script lang="ts">
  import type { FileBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
  import { Icon } from '@significa/svelte-ui';
  export let block: FileBlockObjectResponse;
</script>

<a
  href={`/handbook/files/${block.file.name}`}
  download
  class="flex text-xl flex-row items-center gap-1 my-4"
>
  <Icon icon="attachment" />
  <span>{block.file.name}</span>
</a>
