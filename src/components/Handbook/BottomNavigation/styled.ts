import styled from 'styled-components'
import { media } from '@theme'
import { Link } from 'gatsby'

import { labelStyle, Text } from '../../UI'

import ArrowIcon from '../common/Arrow'

export const Wrapper = styled.footer`
  /* Same as ../Content/styled */
  width: calc(100% - 20rem);
  max-width: 42rem;

  display: flex;

  margin-top: 7.5rem;
  margin-bottom: 7.5rem;

  ${media.large} {
    width: calc(100% - 18rem);
  }

  ${media.medium} {
    width: 100%;
    max-width: 100%;
  }

  ${media.small} {
    margin-top: 5rem;
    margin-bottom: 4rem;

    flex-direction: column;
  }
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

  ${media.small} {
    margin-bottom: 0;
  }
`

export const ImgHolder = styled.div``

export const Image = styled.img`
  width: 100%;

  margin-bottom: -7rem;

  ${media.small} {
    display: none;
  }
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

  transition: background-color ${({ theme }) => theme.transitions.ease()};

  &:first-child {
    margin-right: 1rem;

    ${media.small} {
      margin-right: 0;
      order: 2;
    }
  }

  &:last-child {
    margin-left: 1rem;

    ${media.small} {
      margin-left: 0;
    }
  }

  &:only-child {
    margin-left: 0;
    margin-right: 0;
  }

  ${media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.subtle};

      ${RightArrow} {
        transform: translateX(0.5rem);
      }

      ${LeftArrow} {
        transform: rotate(180deg) translateX(0.5rem);
      }
    }
  }

  ${media.small} {
    width: 100%;

    margin-bottom: 1.5rem;
  }
`
