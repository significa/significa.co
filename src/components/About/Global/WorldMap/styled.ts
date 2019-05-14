import styled, { media, colors } from '@theme'
import { keyframes, css } from 'styled-components'

export const MapWrapper = styled.div`
  padding-top: 4em;
  position: relative;

  margin-bottom: -4em;

  ${media.medium} {
    margin-bottom: -2em;
  }

  ${media.small} {
    margin-bottom: 0;
  }
`

export const MapImg = styled.img`
  width: 100%;
`

export const BasePanel = styled.div`
  position: absolute;
  box-sizing: border-box;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);

  background: ${colors.lightBlack};
  padding: 0.5em;
  border-radius: 6px;
  display: inline-flex;

  ${media.small} {
    width: calc((3rem * 3) + (1rem * 2));
    flex-wrap: wrap;
  }
`

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  box-sizing: border-box;
  position: relative;
  transform: perspective(600px);
  overflow: hidden;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 4em;

  width: 5rem;
  height: 6rem;
  border-radius: 2px;

  &:after {
    content: '';
    display: block;
    width: 100%;
    border: 1px solid ${colors.lightBlack};
    position: absolute;
    top: calc(50% + 1px);
    z-index: 99;
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:nth-child(4) {
    div > div {
      margin-top: -0.05em;
    }
  }

  ${media.large} {
    font-size: 3em;

    width: 4rem;
    height: 5rem;
  }

  ${media.medium} {
    font-size: 2.5em;

    width: 3rem;
    height: 4rem;
  }

  ${media.small} {
    &:nth-child(4) {
      display: none;
    }

    &:nth-child(3),
    &:last-child {
      margin-right: 0;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      margin-bottom: 0.5rem;
    }
  }
`

export const HalfPanel = styled.div<{ position: string }>`
  ${({ theme, position }) => {
    const isTop = position === 'top'

    return css`
      position: ${isTop ? 'relative' : 'absolute'};
      overflow: hidden;
      width: 100%;
      text-align: center;

      div {
        background: ${isTop
          ? `linear-gradient(${theme.colors.foreground} 50%, transparent 50%)`
          : `linear-gradient(transparent 50%, ${theme.colors.foreground} 50%)`};

        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
  }}
`

export const HalfFlipPanel = styled(HalfPanel)<{
  direction: string
  position: string
  time: number
}>`
  ${({ direction, theme, time, position }) => {
    const isIn = direction === 'in'
    const isBottom = position === 'bottom'

    return css`
      position: absolute;
      animation-name: ${isIn ? FlipIn : FlipOut};
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      animation-duration: ${time}ms;
      background: ${isIn
        ? `linear-gradient(transparent 50%, ${theme.colors.background} 50%)`
        : `linear-gradient(${theme.colors.background} 50%, transparent 50%)`};
      opacity: 1;

      ${isBottom && `box-shadow: 0 2px 20px 10px ${theme.colors.background}`};

      div {
        background: ${isBottom
          ? `linear-gradient(transparent 50%, ${theme.colors.foreground} 50%)`
          : `linear-gradient(${theme.colors.foreground} 50%, transparent 50%)`};

        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `
  }}
`

const FlipIn = keyframes`
  0% {
    transform: rotateX(-90deg);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`

const FlipOut = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(90deg);
  }
`
