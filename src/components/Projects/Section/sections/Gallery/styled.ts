import styled, { css } from '@theme'
import { Small } from '../../../../UI'
import { ISpanTypes } from '../../../../../templates/types'

export const Wrapper = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 3em;

  @media (max-width: 48em) {
    grid-gap: 2em;
  }

  @media (max-width: 32em) {
    grid-gap: 1em;
  }
`

const getSpan = (p: { span: ISpanTypes }) => {
  return css`
    grid-column: auto / span ${p.span.normal};

    @media (max-width: 48em) {
      grid-column: auto / span ${p.span.tablet};
    }

    @media (max-width: 32em) {
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

  @media (max-width: 48em) {
    margin-top: 2em;
  }

  @media (max-width: 32em) {
    margin-top: 1em;
  }
`
