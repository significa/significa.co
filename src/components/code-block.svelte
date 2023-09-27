<script lang="ts">
  import clsx from 'clsx';
  import Prism from 'prismjs';
  import 'prism-svelte';
  import 'prismjs/plugins/line-highlight/prism-line-highlight';
  import 'prismjs/plugins/line-numbers/prism-line-numbers';
  import 'prismjs/components/prism-typescript';
  import 'prismjs/components/prism-elixir';
  import 'prismjs/components/prism-bash';
  import { afterUpdate } from 'svelte';

  let className: string | undefined = undefined;
  export { className as class };

  export let code: string;
  export let language: string;

  export let lineNumbers = true;
  export let lineNumbersStartAt = 1;
  export let lineHighlight: string | undefined = undefined;

  let el: HTMLPreElement;

  afterUpdate(() => {
    Prism.highlightAllUnder(el);
  });
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<pre
  tabindex="-1"
  bind:this={el}
  data-line={lineHighlight}
  class={clsx({ 'line-numbers': lineNumbers }, className)}
  data-start={lineNumbersStartAt}
  {...$$restProps}><code class="language-{language}"
    >{@html Prism.highlight(code, Prism.languages[language], language)}</code
  ></pre>

<style lang="postcss">
  /* Generated with http://k88hudson.github.io/syntax-highlighting-theme-generator/www */
  pre,
  code {
    --codeblock-padding: 20px;
    --codeblock-color: hsl(48deg 40% 80%);
    --codeblock-background-color: hsl(48deg 0% 15%);
    --codeblock-color-variable: hsl(15deg 100% 62%);
    --codeblock-color-function: hsl(48deg 100% 57%);
    --codeblock-color-keyword: hsl(48deg 68% 73%);
    --codeblock-color-operator: hsl(48deg 80% 95% / 0.9);
    --codeblock-color-string: hsl(48deg 80% 95% / 0.7);
    --codeblock-color-property: hsl(48deg 80% 95% / 0.9);
    --codeblock-color-punctuation: hsl(48deg 80% 95% / 0.5);
    --codeblock-color-comment: hsl(48deg 80% 95% / 0.4);
    --codeblock-color-line-number: hsl(48deg 80% 95% / 0.2);

    font-family: theme('fontFamily.mono');
    font-size: theme('fontSize.base');
    line-height: theme('lineHeight.relaxed');
    text-shadow: none;

    color: var(--codeblock-color);

    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size: 4;
    hyphens: none;
  }

  @media (--md) {
    pre {
      --codeblock-padding: 32px;
    }
  }

  @media (--lg) {
    pre {
      --codeblock-padding: 40px;
    }
  }

  pre {
    padding: var(--codeblock-padding);
    background: var(--codeblock-background-color);
    border-radius: theme('borderRadius.lg');
    overflow: auto;
  }

  /* tokens */
  pre :global(.namespace) {
    opacity: 0.7;
  }

  pre :global(.token.comment),
  pre :global(.token.prolog),
  pre :global(.token.doctype),
  pre :global(.token.cdata) {
    color: var(--codeblock-color-comment);
  }

  pre :global(.token.punctuation) {
    color: var(--codeblock-color-punctuation);
  }

  pre :global(.token.property),
  pre :global(.token.tag),
  pre :global(.token.boolean),
  pre :global(.token.number),
  pre :global(.token.constant),
  pre :global(.token.symbol),
  pre :global(.token.deleted) {
    color: var(--codeblock-color-property);
  }

  pre :global(.token.selector),
  pre :global(.token.attr-name),
  pre :global(.token.string),
  pre :global(.token.char),
  pre :global(.token.builtin),
  pre :global(.token.inserted) {
    color: var(--codeblock-color-string);
  }

  pre :global(.token.operator),
  pre :global(.token.entity),
  pre :global(.token.url),
  pre :global(.language-css .token.string),
  pre :global(.style .token.string) {
    color: var(--codeblock-color-operator);
    background: transparent;
  }

  pre :global(.token.atrule),
  pre :global(.token.attr-value),
  pre :global(.token.keyword) {
    color: var(--codeblock-color-keyword);
  }

  pre :global(.token.function) {
    color: var(--codeblock-color-function);
  }

  pre :global(.token.regex),
  pre :global(.token.important),
  pre :global(.token.variable) {
    color: var(--codeblock-color-variable);
  }

  pre :global(.token.important),
  pre :global(.token.bold) {
    font-weight: bold;
  }

  pre :global(.token.italic) {
    font-style: italic;
  }

  pre :global(.token.entity) {
    cursor: help;
  }

  /* Line numbers */
  pre.line-numbers {
    --codeblock-numbers-width: 3em;
    --codeblock-numbers-padding: 0.8em;
    --codeblock-numbers-width-padding: calc(
      var(--codeblock-numbers-width) + var(--codeblock-numbers-padding)
    );

    position: relative;
    padding-left: var(--codeblock-numbers-width-padding);
    counter-reset: linenumber;
  }

  pre.line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  pre.line-numbers :global(.line-numbers-rows) {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: calc(var(--codeblock-numbers-width-padding) * -1);
    width: var(--codeblock-numbers-width);
    letter-spacing: -1px;

    user-select: none;
  }

  pre.line-numbers :global(.line-numbers-rows > span) {
    display: block;
    counter-increment: linenumber;
  }

  pre.line-numbers :global(.line-numbers-rows > span:before) {
    color: var(--codeblock-color-line-number);
    content: counter(linenumber);
    display: block;
    padding-right: var(--codeblock-numbers-padding);
    text-align: right;
  }

  /* Line highlight */
  pre[data-line] {
    position: relative;
  }

  pre[data-line] code {
    z-index: 1;
  }

  pre[data-line] :global(.line-highlight) {
    margin-top: var(--codeblock-padding);

    position: absolute;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 4px 0 0 rgba(255, 255, 255, 0.2);
    z-index: 0;
    pointer-events: none;
    line-height: inherit;
    white-space: pre;
  }
</style>
