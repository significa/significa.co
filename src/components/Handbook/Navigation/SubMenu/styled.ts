import styled, { css } from '@theme'

import { linkStyle } from '../styled'

export const Link = styled.a<{
  extraMargin: boolean
  isActive: boolean
}>`
  ${linkStyle};

  display: block;
  padding: 0.5rem 0;
  padding-left: ${({ extraMargin }) => (extraMargin ? '2.5rem' : '1.5rem')};
  border-left: 1px solid ${({ theme }) => theme.colors.subtle};

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      pointer-events: none;
      color: ${({ theme }) => theme.colors.highlight};
      border-left: 1px solid ${({ theme }) => theme.colors.highlight};
    `}
`
