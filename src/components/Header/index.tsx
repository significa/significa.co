import React from 'react'

import { Logo } from '../UI/Branding'
import { Container } from '../UI/Layout'

import { Wrapper, LogoLink, Nav } from './styled'
import { NavLink } from './NavLink'

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <LogoLink to="/">
          <Logo />
        </LogoLink>

        <Nav>
          <NavLink to="/page-2">Page 2</NavLink>
          <NavLink to="/page-3">Page 3</NavLink>
        </Nav>
      </Wrapper>
    </Container>
  )
}

export default Header
