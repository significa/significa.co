import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { Content } from './styled'

import { ThemeProvider } from '../theme'
import Header from '../components/Header'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <StaticQuery
      query={layoutQuery}
      render={data => (
        <ThemeProvider>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>
            {children}
            <footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </Content>
        </ThemeProvider>
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
