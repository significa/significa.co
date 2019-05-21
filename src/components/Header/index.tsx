import React from 'react'

import { Logo } from '../UI/'

import * as S from './styled'
import Navigation from './Navigation'

const Header: React.FC = () => {
  const [shouldClose, setShouldClose] = React.useState(false)

  // reset state
  React.useEffect(() => {
    if (shouldClose) {
      setShouldClose(false)
    }
  }, [shouldClose])

  return (
    <S.Header upTolerance={50} onUnpin={() => setShouldClose(true)}>
      <S.Wrapper>
        <S.Container>
          <S.LogoLink to="/" title="Go to homepage">
            <Logo />
          </S.LogoLink>

          <Navigation forceClose={shouldClose} />
        </S.Container>
      </S.Wrapper>
    </S.Header>
  )
}

export default Header
