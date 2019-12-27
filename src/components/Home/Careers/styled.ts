import styled from 'styled-components'
import { media } from '@theme'
import {
  Container as BaseContainer,
  Title as BaseTitle,
  Big as BaseBig,
} from '../../UI/'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  margin: 10em auto;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3em;

  ${media.medium} {
    margin: 7em auto;
    grid-column-gap: 0;
    grid-row-gap: 3em;
  }

  ${media.small} {
    margin: 5em auto;
  }
`

export const Left = styled.div`
  grid-column: 1 / 6;

  ${media.large} {
    grid-column: 1 / 5;
  }

  ${media.medium} {
    grid-column: 1 / -1;
  }
`

export const Right = styled.div`
  grid-column: 6 / 12;

  ${media.large} {
    grid-column: 5 / 13;
  }

  ${media.medium} {
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

  ${media.large} {
    grid-template: auto / repeat(2, 1fr);
    /** Hide last image **/
    & > *:last-child {
      display: none;
    }
  }

  ${media.medium} {
    margin-top: 7em;
  }

  ${media.small} {
    margin-top: 3em;
    grid-template: auto / auto;
    grid-row-gap: 1em;
  }
`
