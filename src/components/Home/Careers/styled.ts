import styled from '@theme'
import { Container as BaseContainer } from '../../UI/Layout'
import { Title as BaseTitle, Big as BaseBig } from '../../UI/Typography'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  margin: 10em auto;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3em;

  @media (max-width: 48em) {
    grid-column-gap: 0;
    grid-row-gap: 5em;
  }
`

export const Left = styled.div`
  grid-column: 1 / 6;

  @media (max-width: 64em) {
    grid-column: 1 / 5;
  }

  @media (max-width: 48em) {
    grid-column: 1 / -1;
  }
`

export const Right = styled.div`
  grid-column: 6 / 12;

  @media (max-width: 64em) {
    grid-column: 5 / 13;
  }

  @media (max-width: 48em) {
    grid-column: 1 / -1;
  }
`

export const Title = styled(BaseTitle)`
  max-width: 10em;
`

export const Big = styled(BaseBig)`
  margin-bottom: 3em;
`

export const Photos = styled.div`
  grid-column: 1 / -1;

  margin-top: 10em;

  display: grid;
  grid-template: auto / repeat(3, 1fr);
  grid-column-gap: 3em;

  @media (max-width: 64em) {
    grid-template: auto / repeat(2, 1fr);
    /** Hide last image **/
    & > *:last-child {
      display: none;
    }
  }

  @media (max-width: 48em) {
    margin-top: 7em;
  }

  @media (max-width: 32em) {
    margin-top: 3em;
    grid-template: auto / auto;
    grid-row-gap: 1em;
  }
`
