import styled from '@theme'
import { displayStyle, textStyle } from '../../UI'
import { titleStyle, smallTitleStyle } from '../../UI/Typography/styled'
import { liBaseStyle } from '../../UI/List/styled'

export const Renderer = styled.div`
  position: relative;

  * {
    max-width: 38.5rem;
  }

  img {
    width: 100%;
    height: auto;
  }

  h2 {
    ${displayStyle}

    margin-top: 7.5rem;
    margin-bottom: 1.25rem;
  }

  h3 {
    ${titleStyle}

    margin-top: 5rem;
    margin-bottom: 1.25rem;
  }

  h4 {
    ${smallTitleStyle}

    margin-top: 2.5rem;
    margin-bottom: 0.75rem;
  }

  p,
  li {
    ${textStyle}
  }

  ul li {
    ${liBaseStyle}

    &:before {
      content: '-';
      color: ${({ theme }) => theme.colors.highlight};
    }
  }

  ol {
    counter-reset: li;
  }

  ol li {
    ${liBaseStyle}
    counter-increment: li;

    &:before {
      content: counter(li) '.';
      color: ${({ theme }) => theme.colors.highlight};
      left: -1.5rem;
    }
  }

  p,
  ol,
  ul,
  pre,
  .embed {
    margin-bottom: 1.5rem;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  pre {
    font-family: monospace;
    font-size: 1.15rem;
    line-height: 1.5;

    padding: 2rem;
    border-radius: 0.5rem;

    background-color: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.background};
  }
`
