import styled from '@theme'
import Img from 'gatsby-image'

import { Container, ArrowLink as BaseArrowLink } from '../../UI'
import { Big, Text } from '../../UI/Typography'

export const Wrapper = styled(Container)`
  position: relative;
  z-index: 2;

  @media (max-width: 64em) {
    padding-left: 0;
    padding-right: 0;
  }
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

  @media (max-width: 64em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: grid;
    grid-template: auto / repeat(2, 1fr);
    grid-column-gap: 3em;
  }

  @media (max-width: 32em) {
    grid-row-gap: 1.5em;
    grid-template: auto / 1fr;
  }
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

  @media (max-width: 64em) {
    &:first-child,
    &:nth-child(n + 4) {
      display: none;
    }

    margin-bottom: 0;
    margin-right: 0;
    width: 100%;
  }

  @media (max-width: 32em) {
    width: auto;
    height: auto;
  }
`
