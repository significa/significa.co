import React from 'react'

import { Logo } from '../UI/'

import * as S from './styled'
import Navigation from './Navigation'

const Header: React.FC<{}> = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.LogoLink to="/">
          <Logo />
        </S.LogoLink>

        <Navigation />
      </S.Container>
    </S.Wrapper>
  )
}

export default Header
