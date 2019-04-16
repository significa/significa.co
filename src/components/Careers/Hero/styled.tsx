import styled from '@theme'
import Img from 'gatsby-image'

import { Container, Display as BaseDisplay } from '../../UI'

export const Wrapper = styled(Container)`
  padding-top: 10rem;
  overflow: hidden;
`

export const Display = styled(BaseDisplay)``

export const GalleryWrapper = styled.div`
  margin: 3.75rem 0;

  display: flex;
  max-height: 32rem;

  overflow: visible;
`

export const GalleryImage = styled(Img)`
  margin-top: 6rem;
  margin-right: 5rem;
  flex-shrink: 0;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  &:nth-child(3) {
    margin-top: 0;
  }
`
