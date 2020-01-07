import React from 'react'

import { Logo } from '../UI/'

import * as S from './styled'
import Navigation from './Navigation'

import logos from './logos'

// Context to set a random logo on blog
const Context = React.createContext<number | null>(null)

export const Provider: React.FC = ({ children }) => {
  const [indexBlogLogo, setIndexBlogLogo] = React.useState<number | null>(null)

  React.useEffect(() => {
    setIndexBlogLogo(Math.floor(Math.random() * 12) + 1)
  }, [])

  return <Context.Provider value={indexBlogLogo}>{children}</Context.Provider>
}

const Header: React.FC<{ isBlogPage?: boolean; children: React.ReactNode }> = ({
  children,
  isBlogPage,
}) => {
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

            {isBlogPage && indexBlogLogo && logos[indexBlogLogo] && (
              <S.WrapperLogoBlog>
                <S.LogoBlog src={logos[indexBlogLogo]} alt="Significa's blog" />
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

export default React.memo(Header)
