import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import NotFound from '../components/NotFound'

const NotFoundPage = () => {
  const { notFoundYaml } = useStaticQuery(query)

  return (
    <Layout theme="dark">
      <SEO title={notFoundYaml.seo.title} />

      <NotFound />
    </Layout>
  )
}

export default NotFoundPage

const query = graphql`
  {
    notFoundYaml {
      seo {
        title
      }
    }
  }
`
