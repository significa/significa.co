import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Projects } from '../components/Showcase'
import { CallToAction } from '../components/UI'

export interface IProject {
  node: {
    fields: {
      slug: string
    }
    id: string
    title: string
    tagline: string
    services: string[]
    thumbnail: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

interface IShowcase {
  data: {
    showcaseYaml: {
      seo: {
        title: string
        description: string
      }
      cta: {
        title: string
        text: string
        link: string
        linkText: string
      }
    }
    allProjectsYaml: {
      edges: IProject[]
    }
  }
}

const Showcase: React.FC<IShowcase> = ({ data }) => {
  return (
    <Layout>
      <SEO
        title={data.showcaseYaml.seo.title}
        description={data.showcaseYaml.seo.description}
      />

      <Projects projects={data.allProjectsYaml.edges} />

      <CallToAction {...data.showcaseYaml.cta} />
    </Layout>
  )
}

export default Showcase

export const query = graphql`
  query ShowcaseQuery {
    showcaseYaml {
      seo {
        title
        description
      }
      cta {
        title
        text
        link
        linkText
      }
    }

    allProjectsYaml(
      sort: { fields: date, order: DESC }
      filter: { published: { ne: false } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          title
          tagline
          services
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  }
`
