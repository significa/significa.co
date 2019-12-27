import styled from 'styled-components'
import { media } from '@theme'

import {
  Container as BaseContainer,
  Title as BaseTitle,
  Big as BaseBig,
} from '../../UI/'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  margin: 12.5em auto;

  display: grid;
  grid-template: repeat(3, auto) / repeat(12, 1fr);
  grid-column-gap: 3em;
  grid-row-gap: 5em;
  grid-template-areas:
    't t t t t x x x x x x .'
    '. . c c c c c c c c c .'
    '. . . . . b b b b b b .';

  ${media.large} {
    margin: 10em auto;
    grid-template-areas:
      't t t t x x x x x x x x'
      'c c c c c c c c c c c c'
      '. . . . b b b b b b b b';
  }

  ${media.medium} {
    margin: 7em auto;
    grid-row-gap: 3em;
    grid-template-rows: repeat(4, auto);
    grid-column-gap: 0;
    grid-template-areas:
      't t t t t t t t t t t t'
      'x x x x x x x x x x x x'
      'c c c c c c c c c c c c'
      'b b b b b b b b b b b b';
  }
`

export const Left = styled.div`
  grid-area: t;
`

export const TextContent = styled.div`
  grid-area: x;
`

export const Columns = styled.div`
  grid-area: c;

  display: grid;
  grid-template: auto / repeat(3, 1fr);
  grid-column-gap: 3em;

  ${media.medium} {
    grid-template-columns: repeat(1, auto);
    grid-row-gap: 2em;
  }
`

export const Bottom = styled.div`
  grid-area: b;
`

export const Title = styled(BaseTitle)`
  max-width: 10em;
`

export const Big = styled(BaseBig)`
  margin-bottom: 1em;
`
