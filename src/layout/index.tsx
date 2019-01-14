import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { Content } from './styled'

import { Provider, colorArgumentType } from '@theme'
import Header from '../components/Header'

interface ILayoutProps {
  children: React.ReactNode
  theme?: colorArgumentType
}

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <StaticQuery
      query={layoutQuery}
      render={data => (
        <Provider theme={theme}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>
            {children}
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </Content>
        </Provider>
      )}
    />
  )
}

export default Layout

const layoutQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
