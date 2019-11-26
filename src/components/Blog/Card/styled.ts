import styled, { media } from '@theme'

import { SmallTitle, Text } from '../../UI'

export const Image = styled.div`
  margin-bottom: 1.3em;
  overflow: hidden;

  img {
    transition: all ${({ theme }) => theme.transitions.ease()};
    width: 100%;
  }
`

export const Title = styled(SmallTitle)``

export const Description = styled(Text)`
  margin: 0.7em 0 0.9em;
`

export const Content = styled.div`
  will-change: opacity;
  transition: opacity ${({ theme }) => theme.transitions.ease()};
`

export const Article = styled.article`
  margin-bottom: 3.5em;

  ${media.hover} {
    &:hover ${Image} img {
      transform: scale(1.03);
    }

    &:hover ${Content} {
      opacity: 0.6;
    }
  }
`
