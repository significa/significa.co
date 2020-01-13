import styled from 'styled-components'
import { media } from '@theme'

export const Container = styled.div`
  margin-top: 3.9em;
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-column-gap: 3rem;

  ${media.medium} {
    grid-template-columns: 1fr;
  }
`
