import styled, { css } from '@theme'
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
`

export const Toggle = styled.g`
  cursor: pointer;

  rect {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.ease()};
  }
`

export const Path = styled.g``

export const Sun = styled.circle``

export const Logo = styled.path``

interface ISvgProps {
  isVisible: boolean
  animationEnded: boolean
}

export const Svg = styled.svg`
  transform: translate3d(0, 0, 0);
  width: 100%;
  overflow: visible;
  opacity: ${({ isVisible }: ISvgProps) => (isVisible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.ease()};
  pointer-events: ${({ animationEnded }: ISvgProps) =>
    animationEnded ? 'default' : 'none'};

  ${Sun},
  ${Path},
  ${Logo} {
    transition: all ${({ theme }) => theme.transitions.ease('50ms')};
  }

  ${({ animationEnded }) =>
    animationEnded &&
    css`
      ${Toggle} {
        rect {
          opacity: 0.1;
        }
      }

      ${Path} {
        display: none;
      }

      ${Sun} {
        transition: cx ${({ theme }) => theme.transitions.ease()};
      }
    `}
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

  padding-bottom: 15vw;

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
