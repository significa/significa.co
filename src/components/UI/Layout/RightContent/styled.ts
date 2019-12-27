import styled, { css } from 'styled-components'
import { media } from '@theme'

import { Container as BaseContainer } from '../'
import { Title as BaseTitle } from '../../Typography'

export const Wrapper = styled.section`
  margin: 10em 0;

  ${media.medium} {
    margin: 7em 0;
  }

  ${media.small} {
    margin: 5em 0;
  }
`

export const Container = styled(BaseContainer)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3em;

  ${media.medium} {
    grid-column-gap: 0;
    grid-row-gap: 3em;
  }
`

export const Left = styled.div<{ amountColumn: number }>`
  ${({ amountColumn }) => {
    if (amountColumn === 2) {
      return css`
        grid-column: 1 / 6;

        ${media.large} {
          grid-column: 1 / 5;
        }

        ${media.medium} {
          grid-column: 1 / -1;
        }
      `
    }

    if (amountColumn === 3) {
      return css`
        grid-column: 1 / 5;

        ${media.medium} {
          grid-column: 1 / -1;
        }
      `
    }

    if (amountColumn === 4) {
      return css`
        grid-column: 1 / 4;

        ${media.medium} {
          grid-column: 1 / -1;
        }
      `
    }

    return null
  }}
`

export const Right = styled.div<{ amountColumn: number }>`
  ${({ amountColumn }) => {
    if (amountColumn === 2) {
      return css`
        grid-column: 6 / 12;

        ${media.large} {
          grid-column: 5 / 13;
        }

        ${media.medium} {
          grid-column: 1 / -1;
        }
      `
    }

    if (amountColumn === 3) {
      return css`
        grid-column: 5 / 13;

        ${media.medium} {
          grid-column: 1 / -1;
        }
      `
    }

    if (amountColumn === 4) {
      return css`
        grid-column: 4 / 13;

        ${media.medium} {
          grid-column: 1 / -1;
        }
      `
    }

    return null
  }}
`

export const Title = styled(BaseTitle)`
  max-width: 10em;
`
