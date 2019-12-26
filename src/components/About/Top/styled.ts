import styled from 'styled-components'
import { media } from '@theme'

import { Container, Display as BaseDisplay } from '../../UI'

export const TopWrapper = styled(Container)`
  text-align: left;

  margin-top: 7.5rem;
  margin-bottom: 7.5em;

  ${media.small} {
    margin-top: 5em;
    margin-bottom: 5em;
  }
`

export const Display = styled(BaseDisplay)`
  margin-bottom: 0.5rem;
  max-width: 32rem;
`

export const Gallery = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5em;

  ${media.large} {
    grid-gap: 3em;
  }

  ${media.medium} {
    grid-gap: 1.5em;
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.small} {
    grid-template: auto / 1fr;
  }
`

export const ImgHolder = styled.div`
  ${media.medium} {
    &:last-child {
      display: none;
    }
  }
`
