import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../Layout'
import SEO from '../components/SEO'

import { Top, Services, Careers } from '../components/Home/'

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
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <Top headline={content.headline} />
      <Services {...content.services} />
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
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
