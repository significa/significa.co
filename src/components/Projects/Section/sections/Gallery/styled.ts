import styled, { css, media } from '@theme'
import { Small } from '../../../../UI'
import { ISpanTypes } from '../../types'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p: { columns: number }) =>
    `repeat(${p.columns}, 1fr)`};
  grid-gap: 3em;

  ${media.medium} {
    grid-gap: 2em;
  }

  ${media.small} {
    grid-gap: 1em;
  }
`

const getSpan = (p: { span: ISpanTypes }) => {
  return css`
    grid-column: auto / span ${p.span.normal};

    ${media.medium} {
      grid-column: auto / span ${p.span.tablet};
    }

    ${media.small} {
      grid-column: auto / span ${p.span.mobile};
    }
  `
}

export const Item = styled.div`
  ${getSpan};
`

export const Caption = styled(Small).attrs({ as: 'figcaption' })`
  margin-top: 3em;
  color: ${({ theme }) => theme.colors.medium};
  text-align: center;

  ${media.medium} {
    margin-top: 2em;
  }

  ${media.small} {
    margin-top: 1em;
  }
`
