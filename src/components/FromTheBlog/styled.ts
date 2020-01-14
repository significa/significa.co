import styled from 'styled-components'

import { media } from '@theme'

import { ArrowLink as BaseArrowLink } from '../UI/'

export const IconHolder = styled.div`
  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const Wrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.background};
`

export const Holder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ListItem = styled.li`
  position: relative;
  padding-bottom: 2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};

  &:not(:last-child) {
    margin-bottom: 2em;
  }
`

export const Link = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.foreground};
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  ${media.hover} {
    &:hover {
      opacity: 0.6;

      ${IconHolder} {
        transform: translateX(0.5em);
      }
    }
  }
`

export const ArrowLink = styled(BaseArrowLink)`
  margin-top: 3em;
`

export const Author = styled.div`
  margin-top: 1em;
`
