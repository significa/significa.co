import React from 'react'

import { Provider, Theme, colorArgumentType } from '@theme'
import Header from '../Header'
import Footer from '../Footer'
import ConditionalWrap from '../utils/ConditionalWrap'

interface ILayoutProps {
  children: React.ReactNode
  theme?: colorArgumentType
  headerTheme?: colorArgumentType
  footerTheme?: colorArgumentType
  renderHeaderChildren?: React.ReactNode
  isBlogPage?: boolean
}

const Layout: React.FC<ILayoutProps> = ({
  theme,
  headerTheme,
  footerTheme,
  children,
  renderHeaderChildren,
  isBlogPage,
}) => {
  return (
    <Provider theme={theme}>
      <ConditionalWrap
        condition={!!headerTheme}
        wrap={c => <Theme theme={headerTheme as colorArgumentType}>{c}</Theme>}
      >
        <Header isBlogPage={isBlogPage}>{renderHeaderChildren}</Header>
      </ConditionalWrap>
      {children}
      <ConditionalWrap
        condition={!!footerTheme}
        wrap={c => <Theme theme={footerTheme as colorArgumentType}>{c}</Theme>}
      >
        <Footer />
      </ConditionalWrap>
    </Provider>
  )
}

export default Layout
