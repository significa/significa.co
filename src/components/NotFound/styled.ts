import styled from 'styled-components'
import { media } from '@theme'

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

  ${media.medium} {
    &:not(:first-of-type) {
      display: none;
    }
  }
`

export const Link = styled(ArrowLink)`
  margin-top: 4em;
`

export const Video = styled.video`
  z-index: 0;
  position: absolute;
  top: 2rem;
  left: 8rem;
  width: 35rem;

  opacity: 0.2;
  object-fit: cover;

  ${media.medium} {
    display: none;
  }
`
