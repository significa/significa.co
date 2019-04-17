import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Hero, About } from '../components/Careers'

interface ICareers {
  data: {
    careersYaml: {
      seo: {
        title: string
      }
    }
  }
}

const Contact: React.FC<ICareers> = ({ data }) => {
  return (
    <Layout theme="dark" footerTheme="light">
      <SEO title={data.careersYaml.seo.title} />
      <Hero />
      <About />
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query CareersQuery {
    careersYaml {
      seo {
        title
      }
    }
  }
`
