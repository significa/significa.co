import styled from 'styled-components'

import { media } from '@theme'

import { Container as BaseContainer } from '../UI'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  margin-bottom: -5rem; /** offset holder bottom margin **/

  display: grid;
  grid-template-columns: ${({ columns }: { columns: number }) =>
    `repeat(${columns}, 1fr)`};

  /** we're using only column gap to make it easier to change the 
vertical margin on responsive and still keep the masonry effect **/
  grid-column-gap: 5rem;

  ${media.large} {
    grid-template-columns: ${({ columns }: { columns: number }) =>
      `repeat(${Math.min(columns, 2)}, 1fr)`};
    margin-bottom: -3rem; /** offset holder bottom margin **/

    grid-column-gap: 3rem;
  }

  ${media.medium} {
    display: block;
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
