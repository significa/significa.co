import styled, { media } from '@theme'

import { SmallTitle, Text } from '../../UI'

export const Article = styled.article`
  margin-bottom: 3.5em;
`

export const Image = styled.div`
  margin-bottom: 1.3em;
  overflow: hidden;

  img {
    transition: all ${({ theme }) => theme.transitions.ease()};
    width: 100%;
    display: block;
    will-change: transform;
  }
`

export const Title = styled(SmallTitle)`
  transition: opacity ${({ theme }) => theme.transitions.ease()};
`

export const Description = styled(Text)`
  margin: 0.7em 0 0.9em;
  transition: opacity ${({ theme }) => theme.transitions.ease()};
`

export const Content = styled.div`
  will-change: opacity;
`

export const HoverHint = styled.div`
  ${media.hover} {
    &:hover ${Image} img {
      transform: scale(1.02);
    }

    &:hover ${Title}, &:hover ${Description} {
      opacity: 0.6;
    }
  }
`