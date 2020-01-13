import styled from 'styled-components'
import Img from 'gatsby-image'
import { media } from '@theme'

import { SmallTitle, Text } from '../../UI'

export const Image = styled(Img)`
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

export const Title = styled(SmallTitle)``

export const Description = styled(Text)`
  padding-top: 0.2em;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;

  ${media.large} {
    display: block;
    margin-bottom: 2em;
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
