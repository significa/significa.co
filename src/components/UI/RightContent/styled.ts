import styled from '@theme'

import { Container as BaseContainer } from '../Layout'
import { Title as BaseTitle } from '../Typography'

export const Wrapper = styled.section`
  padding: 10em 0;

  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled(BaseContainer)`
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
