import styled, { css } from 'styled-components'
import { media, colors } from '@theme'

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
      position: ${isTop ? 'absolute' : 'relative'};
      background: ${isTop ? theme.colors.background : 'transparent'};
      overflow: hidden;
      width: 100%;
      text-align: center;
    `
  }}
`
