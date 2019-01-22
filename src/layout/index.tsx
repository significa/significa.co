import React from 'react'

import { Content } from './styled'

import { Provider, Theme, colorArgumentType } from '@theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface ILayoutProps {
  children: React.ReactNode
  theme?: colorArgumentType
  footerWhite?: boolean
}

const Layout: React.FC<ILayoutProps> = ({ theme, footerWhite, children }) => {
  return (
    <Provider theme={theme}>
      <Header />
      <Content>{children}</Content>
      {footerWhite ? (
        <Theme theme="light">
          <Footer />
        </Theme>
      ) : (
        <Footer />
      )}
    </Provider>
  )
}

export default Layout
