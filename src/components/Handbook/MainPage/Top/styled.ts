import styled from 'styled-components'
import { media } from '@theme'
import { Container, Display, Small } from '../../../UI'

import { SidenoteWrapper } from '../../CustomComponentParser/styled'

export const Wrapper = styled(Container)`
  text-align: left;

  margin-top: 7.5rem;
  margin-bottom: 7.5em;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${media.small} {
    margin-top: 5em;
    margin-bottom: 5em;
  }
`

export const Left = styled.div`
  max-width: 32rem;
`

export const Title = styled(Display)`
  margin-bottom: 0.75rem;
`

export const Sidenote = styled(SidenoteWrapper)`
  position: relative;
  margin-left: 5rem;

  ${media.medium} {
    display: none;
  }
`

export const SidenoteText = styled(Small)`
  display: block;
`
