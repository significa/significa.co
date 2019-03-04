import styled from '@theme'
import { Container as BaseContainer } from '../../UI/'

export const Container = styled(BaseContainer)`
  margin-bottom: -5rem;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  grid-column-gap: 5rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr 1fr;
    margin-bottom: -3rem;

    grid-column-gap: 3rem;
  }

  @media (max-width: 48em) {
    display: block;
  }

  @media (max-width: 32em) {
    display: none;
  }
`

export const Holder = styled.div<{ rowAmount: number }>`
  grid-row-end: span ${p => p.rowAmount};

  margin-bottom: 5rem;

  @media (max-width: 64em) {
    margin-bottom: 3rem;
  }

  @media (max-width: 48em) {
    grid-row-end: auto;
  }
`
