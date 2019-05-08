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
  position: relative;
`

export const Content = styled.div`
  z-index: 2;
  position: relative;
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
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  object-fit: cover;

  ${media.medium} {
    display: none;
  }
`
