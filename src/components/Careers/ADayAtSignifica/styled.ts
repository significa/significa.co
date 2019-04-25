import styled from '@theme'
import Img from 'gatsby-image'

import { Container } from '../../UI'

export const Wrapper = styled(Container)`
  margin-top: 12em;

  @media (max-width: 64em) {
    margin-top: 3em;
  }
`

export const DayWrapper = styled.div`
  position: relative;

  @media (max-width: 64em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  path {
    transition: strokeColor ${({ theme }) => theme.transitions.ease('400ms')};
  }
`

export const Day = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 71%;
  left: -5.15%;
  width: 100%;
`

export const TopGallery = styled.div`
  display: grid;
  grid-template: 4fr 5fr / repeat(8, 1fr);
  grid-gap: 5em;

  @media (max-width: 64em) {
    grid-gap: 2em;
  }

  @media (max-width: 48em) {
    grid-template: repeat(2, 15em) / repeat(2, 1fr);
  }

  @media (max-width: 32em) {
    grid-template-columns: 1fr;
  }
`

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

  @media (max-width: 64em) {
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

  @media (max-width: 48em) {
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

  @media (max-width: 32em) {
    &:nth-child(1n) {
      margin: 0;
    }

    &:nth-child(2n) {
      display: none;
    }
  }
`

export const BottomGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding-top: 5vw;

  ${GalleryImage} {
    &:nth-child(-n + 2) {
      align-self: flex-end;
    }

    @media (max-width: 64em) {
      &:nth-child(n + 3) {
        display: none;
      }

      margin-bottom: 1.5rem;
      margin-right: 0;
      width: 100%;
    }
  }
`
