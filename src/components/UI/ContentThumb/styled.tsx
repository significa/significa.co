import React from 'react'
import styled from '@theme'
import { Link as BaseLink } from 'gatsby'
import BaseImg from 'gatsby-image'

import { Big as BaseBig } from '../Typography'

export const ImgWrapper = styled.div`
  will-change: transform;
  overflow: hidden;

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

export const Meta = styled.div`
  transition: opacity ${({ theme }) => theme.transitions.ease()};
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

  @media (hover: hover) {
    &:hover ${Img} {
      transform: scale(1.05);
    }

    &:hover ${Meta} {
      opacity: 0.6;
    }
  }
`
