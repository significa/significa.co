import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import { media } from '@theme'

import { SmallTitle, Text } from '../../UI'

export const Image = styled(GatsbyImage)`
  width: 100%;
`

export const Content = styled.div`
  background: ${({ theme: { colors } }) => colors.background};
  padding-top: 2.5em;
  padding-right: 2.5em;
  max-width: 66%;

  transform: translateY(-50%);

  ${media.medium} {
    transform: translateY(-40%);
    max-width: 100%;

    padding-top: 1.5em;
    padding-right: 1.5em;
    padding-left: 1.5em;

    margin-left: 1.5em;
    margin-right: 1.5em;
  }
`

export const Column = styled.div`
  display: flex;
  margin-bottom: 2.2em;

  > * {
    width: 50%;
  }

  ${media.large} {
    display: block;

    > * {
      width: 100%;
    }
  }
`

export const Title = styled(SmallTitle)`
  padding-right: 0;

  ${media.large} {
    padding-right: 16px;
  }
`

export const Description = styled(Text)`
  padding-top: 0.2em;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0;

  ${media.large} {
    display: block;
    margin-bottom: 2em;
    padding-right: 16px;
  }
`

export const Article = styled.article`
  margin-top: 3.9em;
  margin-bottom: -3.9em;

  margin-left: 0;
  margin-right: 0;

  ${media.medium} {
    margin-left: -1.5em;
    margin-right: -1.5em;
  }

  a {
    color: inherit;
    display: block;
  }
`
