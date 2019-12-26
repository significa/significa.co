import styled from 'styled-components'

import PaddedWrapper from '../common/PaddedWrapper'

import { Small } from '../../../../UI'
import DoubleArrow from './DoubleArrow'

export { PaddedWrapper as Wrapper }

export const Container = styled.div`
  position: relative;
`

export const TopImage = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /** target <img> from gatsby-image **/
  img {
    object-position: left center !important;
  }
`

export const Controls = styled.div`
  position: absolute;
  z-index: 1;

  width: 100%;
  height: 100%;
`

export const DragHandle = styled.div`
  position: absolute;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: col-resize;

  /** Always on top of images and has shadow, so no problem with hardcoded white **/
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.2);

  width: 3em;
  height: 3em;
  border-radius: 100%;

  top: 50%;
  /** Left is given inline **/
  transform: translate(-50%, -50%);
`

export const Icon = styled(DoubleArrow)`
  pointer-events: none;
`

export const Line = styled.div`
  position: absolute;
  z-index: 2;

  width: 2px;
  top: -1em;
  bottom: -1em;

  transform: translateX(-50%);

  background-color: ${({ theme }) => theme.colors.foreground};

  opacity: 0.3;
`

export const Caption = styled(Small).attrs({ as: 'figcaption' })`
  margin-top: 1.5em;
  color: ${({ theme }) => theme.colors.medium};
  text-align: center;
`
