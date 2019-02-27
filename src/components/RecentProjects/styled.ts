import styled from '@theme'

import { Container as BaseContainer } from '../UI/'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  display: grid;
  grid-template: auto / repeat(3, 1fr);
  grid-column-gap: 3rem;

  @media (max-width: 64em) {
    grid-template: auto / repeat(2, 1fr);

    /** Hide last one **/
    & > *:last-child {
      display: none;
    }
  }

  @media (max-width: 32em) {
    grid-template: auto / 1fr;
    grid-column-gap: 0;
    grid-row-gap: 3em;
  }
`
