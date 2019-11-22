import styled from '@theme'

import {
  Display as DisplayBase,
  Text as TextBase,
  Label as LabelBase,
  textStyle,
  titleStyle,
  Small,
} from '../components/UI'

import SocialBase from '../components/UI/Social'

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
    margin-bottom: 2em !important;
  }
`

export const Footer = styled.footer`
  max-width: 38em;
  margin: 1.3em auto 6.6em;
`

export const Tag = styled(Small)`
  display: inline-block;
  border: 1px solid ${({ theme: { colors } }) => colors.subtle};
  margin-right: 0.7em;
  padding: 0.2em 0.5em;
`

export const AuthorSection = styled.div`
  margin-top: 3.2em;
  padding-top: 1.2em;
  border-top: 1px solid ${({ theme: { colors } }) => colors.subtle};

  display: flex;
  justify-content: space-between;
`

export const Socials = styled.div``

export const SocialLink = styled(SocialBase)`
  width: 20px;
  height: 20px;
  margin-left: 1.3em;
  opacity: 0.7;
  display: inline-block;
  overflow: hidden;

  vertical-align: top;

  &:hover {
    opacity: 1;
  }
`
