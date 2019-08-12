import styled, { media } from '@theme'
import { Link } from 'gatsby'

import { labelStyle, Text } from '../../UI'

import ArrowIcon from '../common/Arrow'

export const Wrapper = styled.footer`
  /* Same as ../Content/styled */
  max-width: 38.5rem;

  display: flex;

  margin-top: 7.5rem;
  margin-bottom: 7.5rem;
`

export const Header = styled.div``

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

  border: 1px solid ${({ theme }) => theme.colors.subtle};
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.background};

  border-radius: 2px;

  padding: 1.25rem;
  margin-bottom: 7.5rem;

  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  transition: box-shadow ${({ theme }) => theme.transitions.cubic()};

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
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1),
        0px 8px 16px rgba(0, 0, 0, 0.1);

      ${RightArrow} {
        transform: translateX(0.5rem);
      }

      ${LeftArrow} {
        transform: rotate(180deg) translateX(0.5rem);
      }
    }
  }
`
