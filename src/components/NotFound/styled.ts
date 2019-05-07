import styled, { media } from '@theme'

import {
  ArrowLink,
  Container as BaseContainer,
  Title as BaseTitle,
  Display as BaseDisplay,
} from '../UI/'

export const Container = styled(BaseContainer).attrs({ as: 'section' })`
  min-height: 50vh;
  padding: 10vh;
`
export const Title = styled(BaseTitle)`
  margin-bottom: 0.5em;
`

export const Display = styled(BaseDisplay)`
  ${media.small} {
    font-size: 1.5rem;
  }

  button {
    padding: 0;
    background: none;
    font: inherit;
    color: inherit;
    border: none;
    border-bottom: 2px solid white;
    cursor: pointer;
    outline: none;
    display: inline-block;
  }
`

export const Link = styled(ArrowLink)`
  margin-top: 4em;
`

export const Video = styled.video`
  display: none;
`
