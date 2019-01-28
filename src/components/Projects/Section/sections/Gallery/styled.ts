import styled from '@theme'
import { Small } from '../../../../UI'

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

export const Caption = styled(Small).attrs({ as: 'figcaption' })`
  margin-top: 1.5em;
  color: ${({ theme }) => theme.colors.medium};
  text-align: center;
`
