import styled, { media, css } from '@theme'
import { marginTypes } from '../Section/types'

export const getMargins = (p: { margin?: marginTypes }) => {
  if (p.margin && p.margin !== 'none') {
    const hasTop = p.margin === 'top' || p.margin === 'both'
    const hasBottom = p.margin === 'bottom' || p.margin === 'both'

    return css`
      margin-top: ${hasTop ? '5em' : 0};
      margin-bottom: ${hasBottom ? '5em' : 0};

      ${media.medium} {
        margin-top: ${hasTop ? '4em' : 0};
        margin-bottom: ${hasBottom ? '4em' : 0};
      }

      ${media.small} {
        margin-top: ${hasTop ? '3em' : 0};
        margin-bottom: ${hasBottom ? '3em' : 0};
      }
    `
  }

  return css``
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  padding: 2em;

  min-height: 50vh;

  background-color: ${({ theme }) => theme.colors.background};

  ${getMargins};
`
