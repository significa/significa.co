import styled from 'styled-components'
import { media } from '@theme'

export const Wrapper = styled.div`
  position: relative;
`

export const SlideWrapper = styled.div`
  overflow: hidden;
`

export const SlideInner = styled.div`
  display: flex;

  transition: transform ${({ theme }) => theme.transitions.cubic('750ms')};
`

export const Controls = styled.div`
  position: absolute;
  right: 1em;
  bottom: 1em;
`

export const ArrowContainer = styled.button`
  position: relative;
  padding: 0.5em;
  width: 2em;
  height: 2em;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  appearance: none;
  border: none;
  outline: none;

  svg {
    z-index: 1;
    margin-left: 0.3em;
  }

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 2em;
    /** This is meant to be on top of images so it can be always black **/
    background-color: black;
    z-index: 0;

    opacity: 0.1;

    transition: opacity ${({ theme }) => theme.transitions.ease()};
  }

  ${media.hover} {
    &:hover {
      &:before {
        opacity: 0.3;
      }
    }
  }
`

export const Left = styled(ArrowContainer)`
  transform: rotate(180deg);
`

export const Right = styled(ArrowContainer)``
