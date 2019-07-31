import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { Theme } from '@theme'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Top, Services, Careers } from '../components/Home/'
import FromTheLabs from '../components/FromTheLabs'

export interface IServicesContent {
  title: string
  text: string
  cta: string
  link: string
  columns: Array<{
    title: string
    items: string[]
  }>
}

export interface ICareersContent {
  title: string
  text: string
  cta: string
  link: string
  photos: Array<{
    childImageSharp: {
      fluid: FluidObject
    }
  }>
}

interface IHomeContent {
  edges: Array<{
    node: {
      headline: string
      tagline: string
      services: IServicesContent
      careers: ICareersContent
    }
  }>
}

interface IIndexPage {
  data: {
    allHomeYaml: IHomeContent
  }
}

const IndexPage: React.FC<IIndexPage> = ({ data }) => {
  const content = data.allHomeYaml.edges[0].node

  return (
    <Layout>
      <SEO />

      <Top headline={content.headline} tagline={content.tagline} />
      <Services {...content.services} />
      <Theme theme="dark">
        <FromTheLabs />
      </Theme>
      <Careers {...content.careers} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomepageQuery {
    allHomeYaml {
      edges {
        node {
          headline
          tagline
          services {
            title
            text
            cta
            link
            columns {
              title
              items
            }
          }
          careers {
            title
            text
            cta
            link
            photos {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
