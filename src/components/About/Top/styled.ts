import styled, { media } from '@theme'

import { Container, Huge as BaseHuge } from '../../UI'

export const TopWrapper = styled.section`
  padding: 10rem 2rem;
  max-width: 50em;
  margin: 0 auto;

  text-align: center;

  ${media.medium} {
    padding: 8rem 2rem;
  }

  ${media.small} {
    padding: 6rem 1rem;
  }
`

export const Huge = styled(BaseHuge)`
  margin-bottom: 0.5rem;
`

export const Gallery = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5em;

  ${media.medium} {
    grid-row-gap: 1.5em;
    grid-template: auto / 1fr;
  }
`
