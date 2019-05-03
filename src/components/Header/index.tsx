import React from 'react'

import { Logo } from '../UI/'

import * as S from './styled'
import Navigation from './Navigation'

const Header: React.FC = () => {
  return (
    <S.Header upTolerance={50}>
      <S.Wrapper>
        <S.Container>
          <S.LogoLink to="/">
            <Logo />
          </S.LogoLink>

          <Navigation />
        </S.Container>
      </S.Wrapper>
    </S.Header>
  )
}

export default Header
