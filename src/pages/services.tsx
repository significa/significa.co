import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Hero, Sections, Network } from '../components/Services'
import CallToAction from '../components/CallToAction/CallToAction'

interface IContent {
  data: {
    servicesYaml: {
      seo: {
        title: string
        description: string
      }
    }
  }
}

const Contact: React.FC<IContent> = ({
  data: {
    servicesYaml: { seo },
  },
}) => {
  return (
    <Layout>
      <SEO title={seo.title} description={seo.description} />
      <Hero />
      <Sections />
      <Network />
      <CallToAction />
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ServicesQuery {
    servicesYaml {
      seo {
        title
        description
      }
    }
  }
`
