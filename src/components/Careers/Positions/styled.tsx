import styled from 'styled-components'
import { media } from '@theme'
import { Link as RouterLink } from 'gatsby'

import { Text } from '../../UI'

export const ListItem = styled.li`
  position: relative;
  padding-bottom: 2em;

  border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};

  &:not(:first-child) {
    padding-top: 2em;
  }
`

export const Link = styled(RouterLink)`
  display: block;
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  ${media.hover} {
    &:hover {
      opacity: 0.6;
    }
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.foreground};
    margin-left: 0.75rem;
  }
`

export const More = styled(Text)`
  margin-top: 0.5em;
`

export const CompanyImage = styled.img`
  margin-left: 0.7em;
`
