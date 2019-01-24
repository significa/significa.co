import React from 'react'

import { Provider, Theme, colorArgumentType } from '@theme'
import Header from '../Header'
import Footer from '../Footer'

interface ILayoutProps {
  children: React.ReactNode
  theme?: colorArgumentType
  headerTheme?: colorArgumentType
  footerTheme?: colorArgumentType
}

const Layout: React.FC<ILayoutProps> = ({
  theme,
  headerTheme,
  footerTheme,
  children,
}) => {
  return (
    <Provider theme={theme}>
      {headerTheme ? (
        <Theme theme={headerTheme}>
          <Header />
        </Theme>
      ) : (
        <Header />
      )}
      {children}
      {footerTheme ? (
        <Theme theme={footerTheme}>
          <Footer />
        </Theme>
      ) : (
        <Footer />
      )}
    </Provider>
  )
}

export default Layout
