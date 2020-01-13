import styled from 'styled-components'
import { media } from '@theme'

import { Container, ArrowLink } from '../../UI'

export const Wrapper = styled(Container)``

export const Holder = styled.div`
  padding-left: calc(50% + 2.5em);

  ${media.large} {
    padding-left: calc(50% + 1.5em);
  }

  ${media.medium} {
    padding-left: 0;
  }
`

export const Link = styled(ArrowLink)`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.brand};
`
