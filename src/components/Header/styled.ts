import styled, { media } from '@theme'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

import { Container as BaseContainer } from '../UI/'

export const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 3em;
  padding-bottom: 1em;
  transition: padding ${({ theme: { transitions } }) => transitions.ease()};

  ${media.medium} {
    padding-top: 2em;
  }

  &:after {
    content: '';
    position: fixed;
    width: 100vw;
    height: 50vh;
    top: -50vh;
    left: 0;
    background-color: ${({ theme }) => theme.colors.background};
  }
`

export const Header = styled(Headroom)`
  background-color: ${({ theme }) => theme.colors.background};

  .headroom {
    z-index: 999 !important;
  }
  .headroom--pinned {
    ${Wrapper} {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }
`

export const Container = styled(BaseContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LogoLink = styled(Link)`
  transition: ${({ theme }) => theme.transitions.ease('opacity')};
  /* Small optical compensation */
  margin-top: 0.25em;

  ${media.hover} {
    &:hover {
      opacity: 0.8;
    }
  }
`
