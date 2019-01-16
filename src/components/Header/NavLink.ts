import styled from '@theme'
import { Link } from 'gatsby'

import { themeGet } from '../../utils/themeGet'

export const NavLink = styled(Link).attrs({
  activeClassName: 'is-active',
})`
  position: relative;
  padding: 12px 0;

  font-size: 1em;
  line-height: 1em;
  color: ${themeGet('colors.foreground', 'inherit')};

  transition: ${({ theme }) => `color ${theme.transitions.ease()}`};

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

  &:hover,
  &:focus {
    color: ${themeGet('colors.highlight', 'inherit')};

    &:before {
      width: 100%;
    }
  }

  &.is-active {
    pointer-events: none;

    &:before {
      width: 100%;
    }
  }
`
