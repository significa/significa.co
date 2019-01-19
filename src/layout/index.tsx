import React from 'react'

import { Content } from './styled'

import { Provider, colorArgumentType } from '@theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface ILayoutProps {
  children: React.ReactNode
  theme?: colorArgumentType
}

const Layout: React.FC<ILayoutProps> = ({ theme, children }) => {
  return (
    <Provider theme={theme}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Provider>
  )
}

export default Layout
