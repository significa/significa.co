import styled from 'styled-components'

import { media } from '@theme'

import { Container as BaseContainer } from '..'
import { Title as BaseTitle } from '../../Typography'

export const Container = styled(BaseContainer)<{
  gridTemplate: [string, string?, string?]
}>`
  grid-template-columns: ${({ gridTemplate }) => gridTemplate[0]};
  display: grid;
  grid-column-gap: 3em;

  ${media.medium} {
    grid-template-columns: ${({ gridTemplate }) =>
      gridTemplate[1] || gridTemplate[0]};
    grid-column-gap: 0;
    grid-row-gap: 3em;
  }

  ${media.small} {
    grid-template-columns: ${({ gridTemplate }) =>
      gridTemplate[2] || gridTemplate[1] || gridTemplate[0]};
  }
`

export const Title = styled(BaseTitle)`
  max-width: 10em;
  line-height: 1.3;
`
