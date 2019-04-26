import styled from '@theme'
import Img from 'gatsby-image'

import { Container, Display as BaseDisplay } from '../../UI'

export const PageContainer = styled.div`
  overflow: hidden;
`

export const Wrapper = styled(Container)`
  margin-top: 7.5rem;
  margin-bottom: 7.5em;

  @media (max-width: 32em) {
    margin-top: 5em;
    margin-bottom: 5em;
  }
`

export const Display = styled(BaseDisplay)``

export const GalleryWrapper = styled(Container)`
  display: flex;
  max-height: 32rem;

  /* Center top images in  very large screens */
  @media (min-width: 120em) {
    max-width: none;
    justify-content: center;
  }

  @media (max-width: 64em) {
    display: grid;
    grid-template: auto / repeat(2, 1fr);
    grid-column-gap: 3em;
    max-height: none;
  }

  @media (max-width: 32em) {
    grid-row-gap: 1.5em;
    grid-template: auto / 1fr;
  }
`

export const GalleryImage = styled(Img)<{ width: number; height: number }>`
  margin-top: 6rem;
  flex-shrink: 0;

  &:not(:last-child) {
    margin-right: 5rem;
  }

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  &:nth-child(3) {
    margin-top: 0;
  }

  @media (max-width: 64em) {
    &:nth-child(n + 3) {
      display: none;
    }

    margin-top: 0;
    margin-right: 0;
    width: 100%;
  }

  @media (max-width: 32em) {
    width: 100%;
    height: auto;
  }
`
