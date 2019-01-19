import styled, { css } from '@theme'
import { Link as GatsbyLink } from 'gatsby'

import { themeGet } from '../../../utils/themeGet'

export const baseStyle = css`
  position: relative;

  font-size: 1em;
  line-height: 1;
  color: ${themeGet('colors.foreground', 'inherit')};

  transition: ${({ theme }) => `color ${theme.transitions.ease()}`};

  @media (hover: hover) {
    &:hover {
      color: ${themeGet('colors.highlight', 'inherit')};
    }
  }

  @media (max-width: 48em) {
    &:hover {
      color: inherit;
    }
  }
`

export const Link = styled(GatsbyLink).attrs({
  activeClassName: 'is-active',
})`
  ${baseStyle}

  &.is-active {
    color: ${themeGet('colors.medium', 'inherit')};
    pointer-events: none;
  }
`

export const AnchorLink = styled.a`
  ${baseStyle}
`

export const NavLink = styled(Link)`
  padding: 0.75em 0;

  &:before {
    content: '';
    position: absolute;
    height: 1px;
    width: 0;
    left: 0;
    bottom: 0;
    background-color: ${themeGet('colors.highlight', 'inherit')};

    transition: ${({ theme }) => `width ${theme.transitions.cubic()}`};
  }

  @media (hover: hover) {
    &:hover {
      &:before {
        width: 100%;
      }
    }
  }

  @media (max-width: 48em) {
    &:hover {
      &:before {
        width: 0;
      }
    }
  }
`
