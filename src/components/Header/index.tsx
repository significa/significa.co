import React from 'react'

import { Logo } from '../UI/Branding'
import { Container } from '../UI/Layout'

import * as S from './styled'
import Navigation from './Navigation'

const Header: React.FC<{}> = () => {
  return (
    <Container>
      <S.Wrapper>
        <S.LogoLink to="/">
          <Logo />
        </S.LogoLink>

        <Navigation />
      </S.Wrapper>
    </Container>
  )
}

export default Header
