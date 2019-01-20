import styled, { css } from '@theme'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import { Arrow as ArrowIcon } from './Arrow'

interface ILink extends GatsbyLinkProps<any> {
  highlight?: boolean
  reverse?: boolean
}

export const Arrow = styled(ArrowIcon)`
  margin-left: 0.5em;

  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const Link = styled(GatsbyLink)`
  display: inline-flex;
  align-items: center;

  position: relative;

  font-size: 1em;
  line-height: 1;

  color: ${({ theme }) => theme.colors.foreground};
  transition: color ${({ theme }) => theme.transitions.ease()};

  ${Arrow} g {
    stroke: ${({ theme }) => theme.colors.foreground};
    transition: stroke ${({ theme }) => theme.transitions.ease()};
  }

  @media (hover: hover) {
    &:hover ${Arrow} {
      transform: ${(p: ILink) =>
        p.reverse ? `rotate(180deg) translateX(0.25em)` : `translateX(0.25em)`};
    }
  }

  ${(p: ILink) =>
    !p.highlight &&
    css`
      @media (hover: hover) {
        &:hover {
          color: ${({ theme }) => theme.colors.highlight};

          ${Arrow} g {
            stroke: ${({ theme }) => theme.colors.highlight};
          }
        }
      }
    `}

  ${(p: ILink) =>
    p.highlight &&
    css`
      color: ${({ theme }) => theme.colors.highlight};

      ${Arrow} g {
        stroke: ${({ theme }) => theme.colors.highlight};
      }
    `}

  ${(p: ILink) =>
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
