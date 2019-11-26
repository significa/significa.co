import styled from '@theme'

import { SmallTitle, Text } from '../../UI'

export const Article = styled.article`
  margin-top: 3.9em;
  margin-bottom: -3.9em;

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

  background-size: cover;
  background-position: center;
`

export const Content = styled.div`
  background: ${({ theme: { colors } }) => colors.background};
  padding-top: 2.5em;
  padding-right: 2.5em;
  max-width: 66%;

  transform: translateY(-50%);
`

export const Column = styled.div`
  display: flex;
  margin-bottom: 2.2em;

  > * {
    width: 50%;
  }
`

export const Title = styled(SmallTitle)``

export const Description = styled(Text)`
  padding-top: 0.2em;
`

export const Detail = styled.div`
  display: flex;
  align-items: center;
`
