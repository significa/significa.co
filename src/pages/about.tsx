import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'

import {
  Careers,
  Content,
  Global,
  Services,
  Team,
  Top,
} from '../components/About'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

interface IAbout {
  data: {
    aboutYaml: {
      seo: {
        title: string
        description: string
      }
      hero: {
        title: string
        photos: Array<{
          alt: string
          image: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
        }>
      }
    }
  }
}

const Contact: React.FC<IAbout> = ({ data }) => {
  return (
    <Layout theme="light">
      <SEO
        title={data.aboutYaml.seo.title}
        description={data.aboutYaml.seo.description}
      />

      <Top />
      <Content />
      <Global />
      <Careers />
      <Team />
      <Services />
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query AboutQuery {
    aboutYaml {
      seo {
        title
        description
      }
    }
  }
`
