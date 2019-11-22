import styled from '@theme'

import {
  Display as DisplayBase,
  Text as TextBase,
  Label as LabelBase,
  textStyle,
  titleStyle,
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

  h2,
  h3,
  h4 {
    ${titleStyle};
    margin-top: 3.2em;
    margin-bottom: 0.5em;
  }

  a {
    color: ${({ theme: { colors } }) => colors.brand};
  }

  pre {
    margin-left: -6em !important;
    margin-right: -6em !important;
  }
`
