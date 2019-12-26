import styled, { css } from 'styled-components'
import { media } from '@theme'

import { Title as BaseTitle, Big } from '../../UI'

import { hexToRgb } from '../../../utils/hexToRgb'

const TITLE_MARGIN_BOTTOM = '24px'

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3vw;

  ${media.xlarge} {
    grid-column-gap: 3rem;
  }

  ${media.large} {
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: 3.5em;
  }

  ${media.medium} {
    display: flex;
    flex-direction: column-reverse;
    max-width: 38em;
    margin: 0 auto;
  }
`

export const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

export const Content = styled.div`
  ${gridStyle};

  position: relative;

  padding: 7.5em 0;

  ${media.large} {
    padding: 5em 0;
  }

  ${media.large} {
    padding: 3em 0;
  }
`

export const ColumnContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

export const LeftGraphics = styled(ColumnContent)`
  grid-column: 1 / 6;

  ${media.large} {
    grid-column: 1 / 5;
  }
`

export const DesignGraphics = styled(ColumnContent)`
  grid-column: 8 / 11;

  ${media.large} {
    grid-column: 5 / 8;
  }

  ${media.medium} {
    order: -1;

    max-width: 60vw;
  }
`

export const LeftText = styled(ColumnContent)`
  grid-column: 2 / 7;

  ${media.large} {
    grid-column: 1 / 5;
  }

  ${media.medium} {
    margin-bottom: 3em;
  }
`

export const RightText = styled(ColumnContent)`
  grid-column: 7 / 12;

  ${media.large} {
    grid-column: 5 / 9;
  }

  ${media.medium} {
    margin-bottom: 3em;
  }
`

export const Title = styled(BaseTitle)`
  position: relative;
  display: inline-block;
  margin-bottom: ${TITLE_MARGIN_BOTTOM};
`

export const Text = styled(Big)``

export const Image = styled.img`
  width: 100%;
  height: auto;
`

// Development box
export const DevelopmentBox = styled(LeftGraphics)`
  overflow: scroll;

  pre {
    width: 100%;
    font-size: 0.85rem;
    padding: 2rem !important;
    margin: 0 !important;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.subtle} !important;
  }
`

// Design section

export const PickerImage = styled.img`
  position: absolute;
  width: 100%;
  height: auto;

  bottom: -20%;
  right: -50%;
`

export const RelativeWrapper = styled.div`
  position: relative;
`

export const DesignColumnContent = styled(LeftText)`
  ${Title} {
    &:hover {
      z-index: 2;
      box-shadow: inset 0px 0px 0px 1px #42bffe;

      & ~ ${RelativeWrapper}:before {
        display: block;
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        transform: translateY(-100%);
        left: 0;
        right: 0;
        height: ${TITLE_MARGIN_BOTTOM};
        border-top: 1px dashed red;
      }

      & ~ ${RelativeWrapper}:after {
        display: block;
        box-sizing: border-box;
        content: '24';
        padding-left: 0.5rem;
        line-height: ${TITLE_MARGIN_BOTTOM};
        font-size: 0.625rem;
        color: red;
        position: absolute;
        z-index: 1;
        left: 50%;
        top: -${TITLE_MARGIN_BOTTOM};
        height: ${TITLE_MARGIN_BOTTOM};
        width: 1px;
        border-left: 1px solid red;
      }
    }
  }
`

export const Border = styled.div`
  position: absolute;
  pointer-events: none;
  border: ${({ theme }) =>
    `1px solid rgba(${hexToRgb(theme.colors.foreground)}, 0.2)`};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Handle = styled.span`
  position: absolute;
  box-sizing: border-box;
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) =>
    `0 0px 0px 1px rgba(${hexToRgb(theme.colors.foreground)},0.2),
      0 1px 1px 0 rgba(${hexToRgb(theme.colors.foreground)},0.2)
    `};

  &:nth-child(1) {
    top: -3px;
    left: -3px;
  }

  &:nth-child(2) {
    top: -3px;
    right: -3px;
  }

  &:nth-child(3) {
    top: 50%;
    transform: translateY(-50%);
    right: -3px;
  }

  &:nth-child(4) {
    bottom: -3px;
    right: -3px;
  }

  &:nth-child(5) {
    left: -3px;
    bottom: -3px;
  }

  &:nth-child(6) {
    top: 50%;
    transform: translateY(-50%);
    left: -3px;
  }
`

// Design background grid
export const Grid = styled.div`
  position: absolute;
  z-index: 0;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  ${gridStyle};

  ${media.medium} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    top: -5em;
  }

  ${media.small} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const GridColumn = styled.div`
  height: 100%;
  background-image: ${({ theme }) =>
    `linear-gradient(rgba(${hexToRgb(
      theme.colors.medium
    )}, 0) 0%, rgba(${hexToRgb(theme.colors.medium)}, 0.1) 25%)`};

  ${media.large} {
    &:nth-last-child(1),
    &:nth-last-child(2),
    &:nth-last-child(3),
    &:nth-last-child(4) {
      display: none;
    }
  }

  ${media.medium} {
    display: none;

    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      display: block;
    }
  }

  ${media.small} {
    &:nth-child(3),
    &:nth-child(4) {
      display: none;
    }
  }
`
