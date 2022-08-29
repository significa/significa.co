import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import { Theme } from '@theme'

import FromTheBlog from '../components/FromTheBlog'
import { Top, Services, Careers } from '../components/Home/'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

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
    alt: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }>
}

interface IHomeContent {
  headline: string
  tagline: string
  services: IServicesContent
  careers: ICareersContent
}

interface IIndexPage {
  data: {
    homeYaml: IHomeContent
  }
}

const IndexPage: React.FC<IIndexPage> = ({ data }) => {
  const content = data.homeYaml

  return (
    <Layout>
      <SEO />

      <Top headline={content.headline} tagline={content.tagline} />
      <Services {...content.services} />
      <Theme theme="dark">
        <FromTheBlog />
      </Theme>
      <Careers {...content.careers} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomepageQuery {
    homeYaml {
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
            gatsbyImageData(width: 500, placeholder: NONE, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
