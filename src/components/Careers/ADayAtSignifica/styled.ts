import styled from 'styled-components'
import { media } from '@theme'
import Img from 'gatsby-image'

import { Container } from '../../UI'

export const Wrapper = styled(Container)`
  margin-top: 12em;

  ${media.large} {
    margin-top: 3em;
  }
`

export const RelativeWrapper = styled.div`
  position: relative;
  padding-bottom: 20vw;
  margin-bottom: 10vw;

  ${media.medium} {
    padding-bottom: 0;
  }
`

export const Day = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Gallery = styled.div`
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(8, 1fr);
  grid-gap: 5em;

  ${media.large} {
    grid-gap: 2em;
  }

  ${media.medium} {
    grid-template: repeat(2, 15em) / repeat(2, 1fr);
  }

  ${media.small} {
    grid-gap: 1.5em;
    grid-template-columns: 1fr;
  }
`

export const TopGallery = styled(Gallery)`
  grid-template: 4fr 5fr / repeat(8, 1fr);
`

export const BottomGallery = styled(Gallery)``

export const TopImage = styled(Img)`
  &:nth-child(1) {
    margin-left: 5em;
    margin-top: 10em;
    grid-column-end: span 2;
  }

  &:nth-child(2) {
    grid-column-end: span 2;
  }

  &:nth-child(3) {
    grid-column-end: span 3;
    margin-top: 5em;
  }

  &:nth-child(4) {
    grid-column-end: span 3;
    margin-bottom: 5em;
  }

  &:nth-child(5) {
    grid-column-end: span 3;
  }

  &:nth-child(6) {
    grid-column-end: span 2;
    margin-bottom: 10em;
  }

  ${media.large} {
    &:nth-child(1) {
      margin-left: 2em;
      margin-top: 3em;
    }

    &:nth-child(3) {
      margin-top: 2em;
    }

    &:nth-child(4) {
      margin-bottom: 2em;
    }

    &:nth-child(6) {
      margin-bottom: 3em;
    }
  }

  ${media.medium} {
    &:nth-child(1n) {
      margin: 0;
      grid-column-end: span 1;
    }

    &:nth-child(3n - 2) {
      display: none;
    }

    &:nth-child(2) {
      margin-left: 3em;
    }

    &:nth-child(3) {
      margin-top: 5em;
      margin-right: 3em;
    }

    &:nth-child(6) {
      margin-bottom: 3em;
    }
  }

  ${media.small} {
    &:nth-child(1n) {
      margin: 0;
    }

    &:nth-child(2n) {
      display: none;
    }
  }
`

export const BottomImage = styled(Img)`
  &:nth-child(1) {
    margin-top: 5em;
    grid-column-end: span 3;
  }

  &:nth-child(2) {
    grid-column-end: span 3;
  }

  &:nth-child(3) {
    margin-top: 5em;
    grid-column-end: span 2;
  }

  &:nth-child(4) {
    margin-bottom: 5em;
    grid-column: 2 / span 3;
  }

  &:nth-child(5) {
    grid-column-end: span 3;
  }
`
