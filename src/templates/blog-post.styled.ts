import styled from 'styled-components'
import { media } from '@theme'

import {
  Display as DisplayBase,
  Text as TextBase,
  Label as LabelBase,
  textStyle,
  titleStyle,
  smallTitleStyle,
  Small,
} from '../components/UI'

export const Header = styled.header`
  max-width: 38em;
  margin: 5em auto 0;
`

export const Label = styled(LabelBase)`
  margin-bottom: 1em;
`

export const Title = styled(DisplayBase)`
  margin-bottom: 0.45em;
`

export const Description = styled(TextBase)`
  margin-bottom: 1.2em;
`

export const ImageHero = styled.div`
  ${media.medium} {
    margin-left: -1.5em;
    margin-right: -1.5em;
    margin-top: 2em;
    margin-bottom: 4em;
  }

  margin-top: 6.6em;
  margin-bottom: 6em;

  img {
    width: 100%;
    display: block;
  }

  figcaption {
    text-align: center;
    margin-top: 1.4em;
  }
`

const DEFAULT_MARGIN = `3em`
const DEFAULT_NEGATIVE_OFFSET = `6em`

export const Content = styled.div`
  max-width: 38em;
  margin: 0 auto;

  p,
  li {
    ${textStyle};
    margin-bottom: 1.3em;
  }

  ul {
    list-style: disc;
    margin-left: 1.2em;
  }

  li {
    margin-bottom: 0.5em;
  }

  h2 {
    ${titleStyle};
    margin-bottom: 0.5em;
    margin-top: 3.2em;

    ${media.medium} {
      margin-top: 2.2em;
    }
  }

  h3,
  h4 {
    ${smallTitleStyle};
    margin-bottom: 0.5em;
    margin-top: 2em;

    ${media.medium} {
      margin-top: 1.5em;
    }
  }

  strong {
    font-weight: 500;
  }

  a {
    color: ${({ theme: { colors } }) => colors.brand};
  }

  .block-img {
    margin-left: -${DEFAULT_NEGATIVE_OFFSET};
    margin-right: -${DEFAULT_NEGATIVE_OFFSET};
    margin-bottom: ${DEFAULT_MARGIN};
    margin-top: ${DEFAULT_MARGIN};

    ${media.large} {
      margin-left: -1.5em;
      margin-right: -1.5em;
    }
  }

  img {
    max-width: 100%;
  }

  .embed {
    position: relative;
    padding-bottom: 80%;
    padding-top: 25px;
    height: 0;

    margin-bottom: ${DEFAULT_MARGIN};
    margin-left: -${DEFAULT_NEGATIVE_OFFSET};
    margin-right: -${DEFAULT_NEGATIVE_OFFSET};

    ${media.large} {
      padding-bottom: 56%;
      margin-left: -1.5em;
      margin-right: -1.5em;
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  pre {
    margin-left: -${DEFAULT_NEGATIVE_OFFSET} !important;
    margin-right: -${DEFAULT_NEGATIVE_OFFSET} !important;
    margin-bottom: 2em !important;

    ${media.large} {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  code {
    background: rgb(226, 228, 230);
    color: rgb(39, 40, 34);
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    font-size: 0.9em;
  }
`

export const Footer = styled.footer`
  max-width: 38em;
  margin: 1.3em auto 6.6em;

  ${media.small} {
    margin: 1.3em auto 3.6em;
  }
`

export const Tag = styled(Small)`
  display: inline-block;
  border: 1px solid ${({ theme: { colors } }) => colors.subtle};
  margin-right: 0.7em;
  padding: 0.2em 0.5em;
  margin-bottom: 0.7em;
`

export const AuthorSection = styled.div`
  margin-top: 3.2em;
  padding-top: 3.2em;
  border-top: 1px solid ${({ theme: { colors } }) => colors.subtle};
`
