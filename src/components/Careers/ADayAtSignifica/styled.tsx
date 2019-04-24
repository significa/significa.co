import styled from '@theme'
import Img from 'gatsby-image'

import { Container } from '../../UI'

export const Wrapper = styled(Container)`
  margin-top: 12em;

  @media (max-width: 64em) {
    padding-left: 0;
    padding-right: 0;
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

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 10%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background} 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  svg {
    width: 100%;

    circle,
    path {
      transition: all ${({ theme }) => theme.transitions.ease('50ms')};
    }
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
`

export const TopGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin-bottom: 10vw;

  ${GalleryImage} {
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
  }
`

export const BottomGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

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
