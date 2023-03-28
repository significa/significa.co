<script lang="ts">
  import ProjectEntry from '$components/project-entry.svelte';
  import { t } from '$lib/i18n';
  import { Badge, Tag, TextButton } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { slide } from 'svelte/transition';

  export let data;

  let services: string[] = [];
  let deliverables: string[] = [];
  $: {
    data.projects.forEach((project) => {
      project.content.services?.split('\n').forEach((item) => {
        if (!services.includes(item)) {
          services.push(item);
        }
      });
      project.content.deliverables?.split('\n').forEach((item) => {
        if (!deliverables.includes(item)) {
          deliverables.push(item);
        }
      });
    });

    services.sort((a, b) => a.localeCompare(b));
    deliverables.sort((a, b) => a.localeCompare(b));
  }

  $: panels = [
    { type: 'service', items: services },
    { type: 'deliverable', items: deliverables }
  ] as const;
  let open: boolean;
  let filters: { type: 'service' | 'deliverable'; value: string }[] = [];

  $: projects = data.projects.filter((p) => {
    if (!filters.length) return true;

    return filters.some((f) => {
      if (f.type === 'service') {
        return p.content.services?.includes(f.value);
      }

      return p.content.deliverables?.includes(f.value);
    });
  });
</script>

<main>
  <h1 class="container mt-10 text-7xl md:mt-14 lg:mt-20">Projects</h1>

  <!-- Filters -->
  <div class="lg:mt-18 container mt-8 mb-3 flex items-center justify-between md:mt-12">
    <div class="flex items-center gap-2">
      <TextButton iconLeft="configuration" on:click={() => (open = !open)}
        >{t(open ? 'close' : 'filters')}</TextButton
      >
      {#if filters.length}
        <Badge>{filters.length}</Badge>
      {/if}
    </div>
    {#if filters.length}
      <TextButton on:click={() => (filters = [])}>{t('clear-all')}</TextButton>
    {/if}
  </div>
  <div class="border-t border-border">
    {#if open}
      <div transition:slide={{ duration: 300 }} class="border-b border-border">
        <div class="container py-4 md:flex md:py-0">
          {#each panels as { type, items }, i}
            <div
              class={clsx(
                'py-4 md:py-10',
                i === 0 ? 'border-border md:border-r md:pr-6' : 'md:pl-6'
              )}
            >
              <p class="text-xs uppercase tracking-wider text-foreground-secondary">
                {type === 'service' ? t('services') : t('deliverables')}
              </p>
              <div class="mt-2 flex flex-wrap gap-2">
                {#each items as item}
                  <Tag
                    label={item}
                    active={filters.some((f) => f.value === item)}
                    on:click={() => {
                      const rest = filters.filter((f) => f.value !== item);

                      if (filters.some((f) => f.value === item)) {
                        filters = rest;
                      } else {
                        filters = [...rest, { type, value: item }];
                      }
                    }}
                  />
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#each projects as project, i}
    <ProjectEntry {project} variant={i === 0 && !filters.length ? 'featured' : 'default'} />
  {/each}
</main>
