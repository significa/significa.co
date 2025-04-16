<script lang="ts">
  import type { FaqsStoryblok } from '$types/bloks';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { Icon } from '@significa/svelte-ui';
  import { slide } from 'svelte/transition';
  import RichText from '$components/rich-text.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';

  export let block: FaqsStoryblok;
  let openQuestionIndex: number | null = null;

  const toggleQuestion = (index: number) => {
    openQuestionIndex = openQuestionIndex === index ? null : index;
  };
</script>

{#if block.questions?.length}
  <section use:storyblokEditable={block} class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto justify-between gap-12 px-container lg:flex">
      <div class="w-full">
        <h2 class="text-5xl">{block.title}</h2>
        <ul class="mt-10 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
          {#each block.questions as question, i}
            <li class="border-b border-t">
              <button
                on:click={() => toggleQuestion(i)}
                class="flex w-full items-center justify-between gap-2 py-4 text-xl transition-colors hover:text-foreground-secondary"
              >
                <span class="text-left">{question.question}</span>
                <Icon
                  icon="chevron-down"
                  class={`transition-transform duration-200 ${openQuestionIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {#if openQuestionIndex === i}
                <div
                  transition:slide={{ duration: 200 }}
                  class="pb-4 text-lg text-foreground-secondary"
                >
                  {#if question.body}
                    <div use:drawerLinks>
                      <RichText doc={question.body} />
                    </div>
                  {/if}
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>
{/if}
