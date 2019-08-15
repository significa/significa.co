import styled, { css, media } from '@theme'

import { linkStyle } from '../styled'

export const Link = styled.a<{
  extraMargin: boolean
  isActive: boolean
}>`
  ${linkStyle};
  font-size: 0.875rem;

  display: block;
  padding: 0.35rem 0;
  padding-left: ${({ extraMargin }) => (extraMargin ? '3rem' : '2rem')};
  border-left: 1px solid ${({ theme }) => theme.colors.subtle};
  line-height: 1.35em;

  ${media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      pointer-events: none;
      color: ${({ theme }) => theme.colors.highlight};
      border-left: 1px solid ${({ theme }) => theme.colors.highlight};
    `}
`
