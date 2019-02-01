import styled from '@theme'
import BaseImg from 'gatsby-image'

import {
  Container as BaseContainer,
  Huge as BaseHuge,
  ArrowLink as BaseArrowLink,
} from '../../UI/'

export const Section = styled.section`
  position: relative;

  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled(BaseContainer)`
  padding-top: 7em;
  padding-bottom: 7em;

  @media (max-width: 48em) {
    padding-top: 3em;
    padding-bottom: 3em;
  }
`

export const ProjectInfo = styled.div`
  margin-top: 10em;
  margin-bottom: 17em;
  z-index: 1;

  @media (max-width: 64em) {
    margin-top: 7em;
    margin-bottom: 14em;
  }

  @media (max-width: 48em) {
    margin-top: 3em;
    margin-bottom: 0;
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

  @media (max-width: 48em) {
    position: relative !important;
    width: 150%;
    left: -50%;
  }

  /** On very large screens we need to hack a bit into the image **/
  @media (min-width: 100em) {
    img {
      left: 15vw !important;
      width: calc(100% - 15vw) !important;
    }
  }
`

export const Title = styled(BaseHuge)`
  @media (max-width: 48em) {
    margin-bottom: 0.25em;

    font-size: 2.5em;
    line-height: 1.2;
    letter-spacing: 0;
  }
`

export const ArrowLink = styled(BaseArrowLink)`
  @media (max-width: 48em) {
    display: none;
  }
`
