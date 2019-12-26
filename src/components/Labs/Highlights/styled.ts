import styled from 'styled-components'
import { media } from '@theme'
import { Container as BaseContainer } from '../../UI/'

export const Container = styled(BaseContainer)`
  margin-bottom: -5rem;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  grid-column-gap: 5rem;

  ${media.large} {
    grid-template-columns: 1fr 1fr;
    margin-bottom: -3rem;

    grid-column-gap: 3rem;
  }

  ${media.medium} {
    display: block;
  }

  ${media.small} {
    display: none;
  }
`

export const Holder = styled.div<{ rowAmount: number }>`
  grid-row-end: span ${p => p.rowAmount};

  margin-bottom: 5rem;

  ${media.large} {
    margin-bottom: 3rem;
  }

  ${media.medium} {
    grid-row-end: auto;
  }
`
