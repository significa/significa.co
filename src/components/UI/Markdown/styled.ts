import styled from 'styled-components'
import { media } from '@theme'
import { displayStyle, bigStyle, textStyle } from '../Typography'

interface IMarkdownProps {
  narrow?: boolean
  bottomSpace?: boolean
}

export const Markdown = styled.div`
  max-width: ${(p: IMarkdownProps) => (p.narrow ? '38em' : 'auto')};
  margin: ${(p: IMarkdownProps) => (p.narrow ? '0 auto' : '0')};
  padding-bottom: ${(p: IMarkdownProps) => (p.bottomSpace ? '5em' : '0')};

  h1 {
    ${displayStyle}
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  a {
    color: ${p => p.theme.colors.highlight};
  }

  h2,
  h3 {
    ${bigStyle}
    margin-top: 5rem;
    margin-bottom: 0.75rem;

    ${media.small} {
      margin-top: 3rem;
    }
  }

  h3 {
    margin-top: 3rem;

    ${media.small} {
      margin-top: 1rem;
    }
  }

  p {
    ${textStyle}

    margin-top: 1.5rem;
  }

  ul,
  ol {
    padding-left: 1rem;
    margin-top: 0.5rem;
  }

  ul li,
  ol li {
    ${textStyle}
    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }

  ul li {
    list-style: disc;
  }

  ol li {
    list-style: decimal;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: 500;
  }

  hr {
    margin: 3em 0;
    border-top: 1px solid ${({ theme }) => theme.colors.subtle};
  }
`
