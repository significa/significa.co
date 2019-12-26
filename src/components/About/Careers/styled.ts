import styled from 'styled-components'
import { media } from '@theme'

import * as UI from '../../UI'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid;
  padding-bottom: 7.5em;

  ${media.small} {
    padding-bottom: 2em;
  }
`

export const Text = styled(UI.Text)`
  margin-bottom: 1em;
`

export const Gallery = styled(UI.Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5em;

  ${media.large} {
    grid-gap: 3em;
  }

  ${media.medium} {
    grid-gap: 1.5em;
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ImgHolder = styled.div`
  ${media.medium} {
    &:last-child {
      display: none;
    }
  }
`

export const ArrowLink = styled(UI.ArrowLink)`
  margin-top: 3em;
`
