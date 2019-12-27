import styled from 'styled-components'
import { media } from '@theme'

import { Container as BaseContainer } from '../../../UI'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  display: grid;
  grid-template: auto / repeat(3, 1fr);
  grid-column-gap: 3rem;

  ${media.large} {
    grid-template: auto / repeat(2, 1fr);

    /** Hide last one **/
    & > *:last-child {
      display: none;
    }
  }

  ${media.small} {
    grid-template: auto / 1fr;
    grid-column-gap: 0;
    grid-row-gap: 3em;
  }
`
