import { css } from 'styled-components'

export default css`
  body {
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;

    color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.background};

    font-feature-settings: 'liga', 'kern';
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* to propagate the current theme */
  #___gatsby,
  #___gatsby > div {
    background: inherit;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: none;
    font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New,
      monospace;
    font-feature-settings: normal;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    margin-bottom: 0;

    tab-size: 4;

    hyphens: none;
  }

  pre[class*='language-'] {
    overflow: auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
`
