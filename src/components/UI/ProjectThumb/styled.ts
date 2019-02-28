import styled from '@theme'
import { Link as BaseLink } from 'gatsby'
import BaseImg from 'gatsby-image'

import { Big as BaseBig } from '../Typography'

export const ImgWrapper = styled.div`
  will-change: transform;
  overflow: hidden;
`

export const Img = styled(BaseImg)`
  transition: transform ${({ theme }) => theme.transitions.cubic('0.7s')};
`

export const Meta = styled.div`
  transition: opacity ${({ theme }) => theme.transitions.ease()};
`

export const Big = styled(BaseBig)`
  margin-top: 1.25em;
  margin-bottom: 0.5em;
`

export const Link = styled(BaseLink)`
  display: block;

  @media (hover: hover) {
    &:hover ${Img} {
      transform: scale(1.05);
    }

    &:hover ${Meta} {
      opacity: 0.6;
    }
  }
`
