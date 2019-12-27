import styled from 'styled-components'
import { media } from '@theme'

import { Container, Display, Text as BaseText, ArrowLink } from '../../../UI'

export const Wrapper = styled(Container)`
  max-width: 38em;

  margin-top: 7.5em;
  margin-bottom: 12.5em;

  ${media.medium} {
    margin-top: 5em;
    margin-bottom: 7em;
  }
`

export const Title = styled(Display)``
export const Text = styled(BaseText)`
  &:first-of-type {
    margin-top: 0.5rem;
  }
`

export const Button = styled(ArrowLink).attrs({
  reverse: true,
})`
  margin-top: 2rem;
`
