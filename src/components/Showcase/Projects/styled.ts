import styled from '@theme'

import { Container as BaseContainer } from '../../UI/'

export const Container = styled(BaseContainer)`
  margin: 7.5rem auto 2.5rem; /** Bottom = margin minus Holder margin bottom **/

  display: grid;
  grid-template-columns: 1fr 1fr;

  /** we're using only column gap to make it easier to change the 
  vertical margin on responsive and still keep the masonry effect **/
  grid-column-gap: 5rem;

  @media (max-width: 64em) {
    margin: 6rem auto 3rem;

    grid-column-gap: 3rem;
  }

  @media (max-width: 48em) {
    display: block;
  }
`

export const Holder = styled.div<{ rowSpan: number }>`
  grid-row-end: span ${p => p.rowSpan};

  margin-bottom: 5rem;

  @media (max-width: 64em) {
    margin-bottom: 3rem;
  }

  @media (max-width: 48em) {
    grid-row-end: auto;
  }
`
