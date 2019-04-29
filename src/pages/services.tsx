import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Hero } from '../components/Services'

interface IContent {
  data: {
    servicesYaml: {
      seo: {
        title: string
      }
    }
  }
}

const Contact: React.FC<IContent> = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.servicesYaml.seo.title} />
      <Hero />
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ServicesQuery {
    servicesYaml {
      seo {
        title
      }
    }
  }
`
