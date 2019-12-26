import styled from 'styled-components'
import { media } from '@theme'

import { Container as BaseContainer, Big as BaseBig } from '../../UI/'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  padding-top: 10em;
  padding-bottom: 10em;

  display: grid;
  grid-template: auto auto / repeat(12, 1fr);
  grid-column-gap: 3em;
  grid-row-gap: 10em;

  ${media.medium} {
    padding-top: 5em;
    padding-bottom: 5em;

    grid-row-gap: 5em;
    grid-column-gap: 0;
  }
`

export const Top = styled.div`
  grid-column: 4 / 10;

  ${media.largest} {
    grid-column: 3 / 11;
  }

  ${media.large} {
    grid-column: 2 / 12;
  }

  ${media.medium} {
    grid-column: 1 / -1;
    grid-column-gap: 0;
  }
`

export const Bottom = styled.div`
  grid-column: 3 / 11;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 3em;

  ${media.largest} {
    grid-column: 2 / 12;
  }

  ${media.medium} {
    grid-column: 1 / -1;
    grid-template: auto auto / repeat(2, 1fr);
    grid-row-gap: 3em;
    grid-auto-flow: column;
    grid-column-gap: 3em;
  }

  ${media.small} {
    grid-template: repeat(4, auto) / 1fr;
    grid-column-gap: 0;
  }
`

export const Title = styled(BaseBig)`
  margin-bottom: 1em;
`
