import React from 'react'

import { Logo } from '../UI/'

import * as S from './styled'
import Navigation from './Navigation'

const Context = React.createContext<number | null>(null)

export const Provider: React.FC = ({ children }) => {
  const [indexBlogLogo, setIndexBlogLogo] = React.useState<number | null>(null)

  React.useEffect(() => {
    setIndexBlogLogo(Math.floor(Math.random() * 13) + 1)
  }, [])

  return <Context.Provider value={indexBlogLogo}>{children}</Context.Provider>
}

const Header: React.FC<{ isBlogPage?: boolean }> = React.memo(
  ({ children, isBlogPage }) => {
    const indexBlogLogo = React.useContext(Context)

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

              {indexBlogLogo && isBlogPage && (
                <S.WrapperLogoBlog>
                  <S.LogoBlog
                    src={`/blog-logos/${indexBlogLogo}.png`}
                    alt="Significa's blog"
                  />
                </S.WrapperLogoBlog>
              )}
            </div>

            <Navigation forceClose={shouldClose} />
          </S.Container>
        </S.Wrapper>

        {children}
      </S.Header>
    )
  }
)

export default Header
