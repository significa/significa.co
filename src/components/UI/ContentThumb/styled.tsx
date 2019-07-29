import React from 'react'
import styled, { media } from '@theme'
import { Link as BaseLink } from 'gatsby'
import BaseImg from 'gatsby-image'

import { Big as BaseBig } from '../Typography'

export const ImgWrapper = styled.div`
  will-change: transform;

  position: relative;
`

export const IconHolder = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;

  z-index: 10;
`

export const Img = styled(BaseImg)`
  transition: transform ${({ theme }) => theme.transitions.cubic('0.7s')};
`

export const BlurImg = styled(BaseImg)`
  width: 95%;
  left: calc(5% / 2);

  height: 100%;
  top: 1rem;

  z-index: -1;

  filter: blur(10px) brightness(90%);
  opacity: 0.3;

  transition: all ${({ theme }) => theme.transitions.cubic('0.7s')};
`

export const Meta = styled.div`
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  will-change: opacity;
`

export const Big = styled(BaseBig)`
  margin-top: 1.25em;
  margin-bottom: 0.5em;
`

const DetectLink: React.FC<{ to: string }> = ({ to, ...props }) => {
  const internal = /^\/(?!\/)/.test(to)
  const external = /^http/.test(to)

  if (internal) {
    return <BaseLink to={to} {...props} />
  }

  if (external) {
    return (
      <a
        href={to}
        role="button"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  }

  return null
}

export const Link = styled(DetectLink)`
  display: block;

  ${media.hover} {
    &:hover ${Img} {
      transform: scale(1.03);
    }

    &:hover ${BlurImg} {
      width: 92%;
      left: calc(8% / 2);

      top: 0.75rem;
    }

    &:hover ${Meta} {
      opacity: 0.6;
    }
  }
`
