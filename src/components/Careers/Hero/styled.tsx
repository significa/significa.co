import styled from '@theme'
import Img from 'gatsby-image'

import { Container, Display as BaseDisplay } from '../../UI'

export const PageContainer = styled.div`
  overflow: hidden;
`

export const Wrapper = styled(Container)`
  padding-top: 10rem;
`

export const Display = styled(BaseDisplay)``

export const GalleryWrapper = styled.div`
  margin: 3.75rem 0;

  display: flex;
  max-height: 32rem;

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
  margin-right: 5rem;
  flex-shrink: 0;

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
    width: auto;
    height: auto;
  }
`
