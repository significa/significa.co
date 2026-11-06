<script lang="ts">
  import Heading from '$components/heading.svelte';
  import type { FaqsStoryblok } from '$types/bloks';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { Icon } from '@significa/svelte-ui';
  import RichText from '$components/rich-text.svelte';
  import HeadingScope from '$components/heading-scope.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';

  export let block: FaqsStoryblok;
  let openQuestionIndex: number | null = null;

  const toggleQuestion = (index: number) => {
    openQuestionIndex = openQuestionIndex === index ? null : index;
  };
</script>

{#if block.questions?.length}
  <section use:storyblokEditable={block} class="my-10 md:mt-14 lg:my-20">
    <div class="container mx-auto justify-between gap-12 px-container lg:flex">
      <div class="w-full">
        <Heading offset={0} visual={2} class="text-5xl">{block.title}</Heading>
        <ul class="mt-10 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
          {#each block.questions as question, i}
            <li class="border-b border-t">
              <button
                id="faq-question-{block._uid}-{i}"
                aria-expanded={openQuestionIndex === i}
                aria-controls="faq-answer-{block._uid}-{i}"
                on:click={() => toggleQuestion(i)}
                class="flex w-full items-center justify-between gap-2 py-4 text-xl transition-colors hover:text-foreground-secondary"
              >
                <span class="text-left">{question.question}</span>
                <Icon
                  icon="chevron-down"
                  class={`transition-transform duration-200 ${openQuestionIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <!--
                Answers are always in the HTML (crawlers and agents read them without JavaScript)
                and collapsed with a grid-rows transition that matches the previous slide.
              -->
              <div
                id="faq-answer-{block._uid}-{i}"
                role="region"
                aria-labelledby="faq-question-{block._uid}-{i}"
                inert={openQuestionIndex !== i}
                class="grid transition-[grid-template-rows] duration-200 ease-out {openQuestionIndex ===
                i
                  ? 'grid-rows-[1fr]'
                  : 'grid-rows-[0fr]'}"
              >
                <div class="overflow-hidden">
                  <div class="pb-4 text-lg text-foreground-secondary">
                    {#if question.body}
                      <div use:drawerLinks>
                        <HeadingScope>
                          <RichText doc={question.body} />
                        </HeadingScope>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>
{/if}
