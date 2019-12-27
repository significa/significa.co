import styled, { keyframes, css } from 'styled-components'
import { IFullTheme } from '@theme'

import ClipIcon from './Clip'
import ClearIcon from './Clear'

export const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
`

export const Input = styled.input.attrs({ type: 'file' })`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
`

interface IButton {
  hasError?: boolean
  theme: IFullTheme
}

export const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  outline: none;

  display: inline-flex;
  align-items: center;

  padding: 0.25rem 0;

  font-size: 1rem;
  line-height: 1;
  font-family: inherit;

  color: ${({ hasError, theme }: IButton) =>
    hasError ? theme.colors.error : theme.colors.foreground};
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  &:hover,
  ${Input}:focus + & {
    opacity: 0.6;
  }

  &:after {
  }
`

interface IClip {
  hasError?: boolean
  theme: IFullTheme
}

export const Clip = styled(ClipIcon)`
  margin-right: 0.5rem;

  g {
    stroke: ${({ hasError, theme }: IClip) =>
      hasError ? theme.colors.error : theme.colors.foreground};
  }
`

const rotate = keyframes`
  from {
    transform: translate(100%, -50%) rotate(0deg);
  }

  to {
    transform: translate(100%, -50%) rotate(360deg);
  }
`

const commonCircleStyle = css`
  height: 1rem;
  width: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.foreground};
  border-radius: 100%;

  position: absolute;

  right: -0.5rem;
  top: 50%;
  /** Transform will be applied or inline or in the animation **/
`

export const Uploading = styled.div`
  ${commonCircleStyle};
  /** Transform applied in animation **/

  pointer-events: none;

  background: none;
  border-top-color: transparent;

  transition: opacity ${({ theme }) => theme.transitions.ease()};
  animation: ${rotate} 1s cubic-bezier(0.2, 1, 0.2, 1) infinite;
`

export const ClearButton = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 0;
  outline: none;
  box-shadow: 0;
  appearance: none;
  -webkit-appearance: none;
  padding: 0;
  margin: 0;
  background: none;

  ${commonCircleStyle};
  transform: translate(100%, -50%);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  opacity: 0.6;
  transition: opacity ${({ theme }) => theme.transitions.ease()},
    border-color ${({ theme }) => theme.transitions.ease()};

  border-color: transparent;

  &:hover,
  &:active {
    opacity: 1;
    border-color: ${({ theme }) => theme.colors.foreground};

    & + ${Uploading} {
      opacity: 0;
    }
  }
`

export const Clear = styled(ClearIcon)``
