import styled from 'styled-components'
import { media } from '@theme'
import BaseImg from 'gatsby-image'

import {
  Container as BaseContainer,
  Display as BaseDisplay,
  ArrowLink as BaseArrowLink,
} from '../../UI/'

export const Section = styled.section`
  position: relative;

  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled(BaseContainer)`
  padding-top: 7em;
  padding-bottom: 7em;
  position: relative;
  z-index: 1;

  ${media.medium} {
    padding-top: 3em;
    padding-bottom: 3em;
  }
`

export const Img = styled(BaseImg)`
  position: absolute !important; /** Gatsby adds the position relative as inline */
  top: 0;
  right: 0;
  bottom: 0;
  left: 10vw;
  z-index: 0;
  pointer-events: none;

  ${media.medium} {
    display: none;
  }
`

export const Display = styled(BaseDisplay)`
  margin-bottom: 0.25em;
`

export const ArrowLink = styled(BaseArrowLink)`
  margin-top: 3em;
`
