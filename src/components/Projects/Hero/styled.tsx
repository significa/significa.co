import styled from '@theme'
import BaseImg from 'gatsby-image'

import { Container as BaseContainer } from '../../UI/Layout'
import { Huge as BaseHuge } from '../../UI/Typography'
import { ArrowLink as BaseArrowLink } from '../../UI/Links/ArrowLink'

export const Section = styled.section`
  position: relative;
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
  z-index: -1;

  @media (max-width: 48em) {
    position: relative !important;
    width: 150%;
    left: -50%;
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
