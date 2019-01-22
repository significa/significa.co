import styled from '@theme'

import { Container as BaseContainer } from '../../UI/Layout'
import { Big as BaseBig } from '../../UI/Typography'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  padding-top: 10em;
  padding-bottom: 10em;

  display: grid;
  grid-template: auto auto / repeat(12, 1fr);
  grid-column-gap: 3em;
  grid-row-gap: 10em;

  @media (max-width: 48em) {
    padding-top: 5em;
    padding-bottom: 5em;

    grid-row-gap: 5em;
    grid-column-gap: 0;
  }
`

export const Top = styled.div`
  grid-column: 4 / 10;

  @media (max-width: 80em) {
    grid-column: 3 / 11;
  }

  @media (max-width: 64em) {
    grid-column: 2 / 12;
  }

  @media (max-width: 48em) {
    grid-column: 1 / -1;
    grid-column-gap: 0;
  }
`

export const Bottom = styled.div`
  grid-column: 3 / 11;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 3em;

  @media (max-width: 80em) {
    grid-column: 2 / 12;
  }

  @media (max-width: 48em) {
    grid-column: 1 / -1;
    grid-template: auto auto / repeat(2, 1fr);
    grid-row-gap: 3em;
    grid-auto-flow: column;
    grid-column-gap: 3em;
  }

  @media (max-width: 32em) {
    grid-template: repeat(4, auto) / 1fr;
    grid-column-gap: 0;
  }
`

export const Title = styled(BaseBig)`
  margin-bottom: 1em;
`
