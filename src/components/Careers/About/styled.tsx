import styled from '@theme'
import Img from 'gatsby-image'

import { Container, ArrowLink as BaseArrowLink } from '../../UI'
import { Big, Text } from '../../UI/Typography'

export const Wrapper = styled(Container)`
  padding-top: 10rem;
`

export const ArrowLink = styled(BaseArrowLink)``

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    box-sizing: border-box;
    width: 50%;
    padding-right: 3em;

    @media (max-width: 64em) {
      width: 100%;
      padding-right: 0;
    }
  }
`

export const SectionTitle = styled(Big)`
  margin-bottom: 0.5rem;
`

export const SectionText = styled(Text)`
  margin-bottom: 3em;
`

export const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const GalleryImage = styled(Img)<{ width: number; height: number }>`
  margin-bottom: 5rem;
  margin-right: 5rem;
  flex-shrink: 0;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  &:last-child {
    margin-right: 0;
  }

  &:nth-child(-n + 3) {
    align-self: flex-end;
  }
`
