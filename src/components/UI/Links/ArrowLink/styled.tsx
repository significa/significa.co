import React from 'react'
import styled, { css, media } from '@theme'
import { Link as GatsbyLink } from 'gatsby'
import { Arrow as ArrowIcon } from './Arrow'

interface ILink {
  highlight?: boolean
  reverse?: boolean
  to: string
}

export const Arrow = styled(ArrowIcon)`
  margin-left: 0.5em;

  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

const ExtractedPropsLink = ({ highlight, reverse, to, ...rest }: ILink) => (
  <GatsbyLink to={to} {...rest} />
)

export const Link = styled(ExtractedPropsLink)`
  display: inline-flex;
  align-items: center;

  position: relative;

  font-size: 1.125rem;
  line-height: 1;

  color: ${({ theme }) => theme.colors.foreground};
  transition: color ${({ theme }) => theme.transitions.ease()};

  ${Arrow} g {
    stroke: ${({ theme }) => theme.colors.foreground};
    transition: stroke ${({ theme }) => theme.transitions.ease()};
  }

  ${media.hover} {
    &:hover ${Arrow} {
      transform: ${p =>
        p.reverse ? `rotate(180deg) translateX(0.25em)` : `translateX(0.25em)`};
    }
  }

  ${p =>
    !p.highlight &&
    css`
      ${media.hover} {
        &:hover {
          color: ${({ theme }) => theme.colors.highlight};

          ${Arrow} g {
            stroke: ${({ theme }) => theme.colors.highlight};
          }
        }
      }
    `}

  ${p =>
    p.highlight &&
    css`
      color: ${({ theme }) => theme.colors.highlight};

      ${Arrow} g {
        stroke: ${({ theme }) => theme.colors.highlight};
      }
    `}

  ${p =>
    p.reverse &&
    css`
      flex-direction: row-reverse;

      ${Arrow} {
        margin-left: 0;
        margin-right: 0.5em;

        transform: rotate(180deg);
      }
    `}
`
