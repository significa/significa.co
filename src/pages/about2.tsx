import { graphql } from 'gatsby'
import React from 'react'

import { Services, Top } from 'components/About2'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

type AboutData = {
  data: {
    aboutYaml: {
      seo: {
        title: string
        description: string
      }
    }
  }
}

const AboutPage: React.FC<AboutData> = ({ data }) => {
  return (
    <Layout headerTheme="dark">
      <SEO
        title={data.aboutYaml.seo.title}
        description={data.aboutYaml.seo.description}
      />

      <Top />
      <Services />
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query AboutPage {
    aboutYaml {
      seo {
        title
        description
      }
    }
  }
`
