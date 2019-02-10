import styled, { css } from '@theme'
import { marginTypes } from './types'

const getMargins = (p: { margin?: marginTypes }) => {
  if (p.margin && p.margin !== 'none') {
    const hasTop = p.margin === 'top' || p.margin === 'both'
    const hasBottom = p.margin === 'bottom' || p.margin === 'both'

    return css`
      padding-top: ${hasTop ? '5em' : 0};
      padding-bottom: ${hasBottom ? '5em' : 0};

      @media (max-width: 48em) {
        padding-top: ${hasTop ? '4em' : 0};
        padding-bottom: ${hasBottom ? '4em' : 0};
      }

      @media (max-width: 32em) {
        padding-top: ${hasTop ? '2em' : 0};
        padding-bottom: ${hasBottom ? '2em' : 0};
      }
    `
  }

  return css``
}

export const SectionWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};

  ${getMargins}
`
