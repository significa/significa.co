import styled from 'styled-components'
import { media } from '@theme'

import { themeGet } from '../../../../utils/themeGet'

import { Link } from '../'

export const NavLink = styled(Link)`
  padding: 0.75em 0;
  text-decoration: none;

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

  ${media.hover} {
    &:hover {
      &:before {
        width: 100%;
      }
    }
  }

  ${media.medium} {
    ${media.hover} {
      &:hover {
        &:before {
          width: 0;
        }
      }
    }
  }
`
