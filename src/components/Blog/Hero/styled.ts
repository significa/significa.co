import styled, { media } from '@theme'

import { SmallTitle, Text } from '../../UI'

export const Article = styled.article`
  margin-top: 3.9em;
  margin-bottom: -3.9em;

  margin-left: 0;
  margin-right: 0;

  ${media.small} {
    margin-left: -1.5em;
    margin-right: -1.5em;
  }

  a {
    color: inherit;
    display: block;
  }
`

export const Image = styled.div`
  position: relative;
  height: 0;
  overflow: hidden;
  padding-top: 33%;

  ${media.small} {
    padding-top: 60%;
  }

  background-size: cover;
  background-position: center;
`

export const Content = styled.div`
  background: ${({ theme: { colors } }) => colors.background};
  padding-top: 2.5em;
  padding-right: 2.5em;
  max-width: 66%;

  transform: translateY(-50%);

  ${media.small} {
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

  ${media.small} {
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

  ${media.small} {
    display: block;
    margin-bottom: 2em;
  }
`
