import styled, { css, media } from '@theme'

import { linkStyle } from '../styled'

export const Link = styled.a<{
  extraMargin: boolean
  isActive: boolean
}>`
  ${linkStyle};

  display: block;
  padding: 0.5rem 0;
  padding-left: ${({ extraMargin }) => (extraMargin ? '3rem' : '2rem')};
  border-left: 1px solid ${({ theme }) => theme.colors.subtle};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
