import styled, { media } from '@theme'
import {
  displayStyle,
  textStyle,
  titleStyle,
  smallTitleStyle,
  labelStyle,
} from '../../UI'
import { liBaseStyle } from '../../UI/List/styled'

export const Renderer = styled.div`
  position: relative;

  * {
    max-width: 38.5rem;
  }

  figure {
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
  }

  img {
    width: 100%;
    height: auto;

    border-radius: 2px;
  }

  figcaption {
    ${labelStyle};

    margin-top: 1rem;
    text-align: center;
  }

  h2 {
    ${displayStyle}

    padding-top: 7.5rem;
    margin-bottom: 1.25rem;
  }

  figure + h2 {
    padding-top: 4.5rem;
  }

  h3 {
    ${titleStyle}

    padding-top: 5rem;
    margin-bottom: 1.25rem;
  }

  figure + h3 {
    padding-top: 1.5rem;
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

  a {
    color: ${({ theme }) => theme.colors.highlight};

    transition: opacity ${({ theme }) => theme.transitions.ease()};

    ${media.hover} {
      &:hover {
        opacity: 0.6;
      }
    }
  }
`
