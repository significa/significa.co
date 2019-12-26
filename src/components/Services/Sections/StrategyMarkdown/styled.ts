import styled, { css } from 'styled-components'
import { media, IFullTheme } from '@theme'

import { hexToRgb } from '../../../../utils/hexToRgb'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;

  border: ${({ theme }) =>
    `1px solid rgba(${hexToRgb(theme.colors.medium)}, 0.4)`};
  background-color: ${({ theme }) =>
    `rgba(${hexToRgb(theme.colors.subtle)}, 0.3)`};

  min-height: 30em;

  ${media.large} {
    min-height: 25em;
  }
`

export const TextContent = styled.div`
  padding: 3rem;

  font-family: monospace;
  line-height: 1.5;

  ${media.large} {
    padding: 2rem;
  }

  ${media.small} {
    padding: 1.5rem;
  }
`

export const Text = styled.p``

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  border-top: ${({ theme }) =>
    `1px solid rgba(${hexToRgb(theme.colors.medium)}, 0.4)`};
`

export const BottomButton = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.875em;
  line-height: 1;
  padding: 0.5rem 0;

  svg {
    margin-left: 0.5rem;
  }

  ${({
    theme,
    isHighlighted,
  }: {
    theme: IFullTheme
    isHighlighted?: boolean
  }) =>
    isHighlighted &&
    css`
      color: ${theme.colors.highlight};
    `}

  ${media.largest} {
    &:last-child {
      display: none;
    }
  }

  ${media.large} {
    &:nth-last-child(2) {
      display: none;
    }
  }

  ${media.medium} {
    &:last-child,
    &:nth-last-child(3) {
      display: inline;
    }
  }

  ${media.small} {
    &:last-child,
    &:nth-last-child(2),
    &:nth-last-child(3) {
      display: none;
    }
  }
`

export const Divider = styled.span`
  display: block;
  width: 1px;
  background-color: ${({ theme }) =>
    `rgba(${hexToRgb(theme.colors.medium)}, 0.4)`};

  ${media.small} {
    display: none;
  }
`
