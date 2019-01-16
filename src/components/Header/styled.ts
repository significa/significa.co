import styled from '@theme'
import { Link } from 'gatsby'

export const Wrapper = styled.header`
  padding-top: 3em;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LogoLink = styled(Link)`
  transition: ${({ theme }) => theme.transitions.ease('opacity')};

  &:hover {
    opacity: 0.8;
  }
`

export const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2em;
`
