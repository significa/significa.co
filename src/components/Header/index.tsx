import React from 'react'

import { Logo } from '../UI/'

import * as S from './styled'
import Navigation from './Navigation'
import imageBlog from '../../assets/images/blog-logo.png'

const Header: React.FC<{ isBlogPage?: boolean }> = ({
  children,
  isBlogPage,
}) => {
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
          <div>
            <S.LogoLink to="/" title="Go to homepage">
              <Logo />
            </S.LogoLink>

            {isBlogPage && (
              <S.LogoBlog src={imageBlog} alt="Significa's blog" />
            )}
          </div>

          <Navigation forceClose={shouldClose} />
        </S.Container>
      </S.Wrapper>

      {children}
    </S.Header>
  )
}

export default Header
