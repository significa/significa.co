import React from 'react'
import styled, { css } from '@theme'
import { Link as GatsbyLink } from 'gatsby'

import { linkStyle } from '../styled'

const SaneGatsbyLink = ({ extraMargin, isActive, ...rest }: any) => {
  return <GatsbyLink {...rest} />
}

export const Link = styled(SaneGatsbyLink)<{
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
