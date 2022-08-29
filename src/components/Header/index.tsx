import React, {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Logo } from '../UI/'
import Navigation from './Navigation'
import logos from './logos'
import * as S from './styled'

// Context to set a random logo on blog
const Context = createContext<number | null>(null)

export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [indexBlogLogo, setIndexBlogLogo] = useState<number | null>(null)

  useEffect(() => {
    setIndexBlogLogo(Math.floor(Math.random() * 12) + 1)
  }, [])

  return <Context.Provider value={indexBlogLogo}>{children}</Context.Provider>
}

const Header: React.FC<{ isBlogPage?: boolean; children: React.ReactNode }> = ({
  children,
  isBlogPage,
}) => {
  const indexBlogLogo = useContext(Context)

  const [shouldClose, setShouldClose] = useState(false)

  // reset state
  useEffect(() => {
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

export default memo(Header)
