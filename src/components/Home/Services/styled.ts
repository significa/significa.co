import styled from '@theme'

import { Container as BaseContainer } from '../../UI/Layout'
import { Title as BaseTitle, Big as BaseBig } from '../../UI/Typography'

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

  @media (max-width: 64em) {
    grid-template-areas:
      't t t t x x x x x x x x'
      'c c c c c c c c c c c c'
      '. . . . b b b b b b b b';
  }

  @media (max-width: 48em) {
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

  @media (max-width: 48em) {
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
