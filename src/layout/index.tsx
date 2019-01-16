import React from 'react'

import { Content } from './styled'

import { Provider, colorArgumentType } from '@theme'
import Header from '../components/Header'

interface ILayoutProps {
  children: React.ReactNode
  theme?: colorArgumentType
}

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <Provider theme={theme}>
      <Header />
      <Content>{children}</Content>
    </Provider>
  )
}

export default Layout
