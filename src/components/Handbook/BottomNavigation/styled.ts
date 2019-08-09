import styled, { media } from '@theme'
import { Link } from 'gatsby'

import { labelStyle, Text } from '../../UI'

import ArrowIcon from './Arrow'

export const Wrapper = styled.footer`
  /* Same as ../Content/styled */
  max-width: 38.5rem;

  display: flex;

  margin-top: 7.5rem;
  margin-bottom: 7.5rem;
`

export const Header = styled.div`
  transition: opacity ${({ theme }) => theme.transitions.ease()};
`

export const LeftArrow = styled(ArrowIcon)`
  transform: rotate(180deg);
  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const RightArrow = styled(ArrowIcon)`
  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const Prev = styled.p`
  ${labelStyle}
  color: inherit;

  text-align: right;
`

export const Next = styled.p`
  ${labelStyle}
  color: inherit;
`

export const Title = styled(Text)`
  color: inherit;
`

export const LinkHolder = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ImgHolder = styled.div``

export const Image = styled.img`
  width: 100%;

  margin-bottom: -7.5rem;
`

export const Box = styled(Link)`
  display: block;
  box-sizing: border-box;
  width: calc(50% - 1rem);

  background-color: ${({ theme }) => theme.colors.subtle};
  color: ${({ theme }) => theme.colors.foreground};

  border-radius: 2px;

  padding: 1.25rem;
  margin-bottom: 7.5rem;

  &:first-child {
    margin-right: 1rem;
  }

  &:last-child {
    margin-left: 1rem;
  }

  &:only-child {
    margin-left: 0;
    margin-right: 0;
  }

  ${media.hover} {
    &:hover {
      ${Header} {
        opacity: 0.6;
      }

      ${RightArrow} {
        transform: translateX(0.5rem);
      }

      ${LeftArrow} {
        transform: rotate(180deg) translateX(0.5rem);
      }
    }
  }
`
