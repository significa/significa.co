import styled from '@theme'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

import { Container as BaseContainer } from '../UI/'

export const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: 3em;
  padding-bottom: 1em;
  transition: padding ${({ theme: { transitions } }) => transitions.ease()};

  @media (max-width: 48em) {
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
  .headroom--pinned {
    ${Wrapper} {
      padding-top: 1em;
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

  @media (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`
