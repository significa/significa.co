import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

import { themeGet } from '../../../../utils/themeGet'

import { baseStyle } from '../common'

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
