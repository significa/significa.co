import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import { Top, All } from '../components/Labs'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { LabsSourceType } from '../components/UI'

export interface ILabType {
  title: string
  tagline: string
  image: {
    alt: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  source: LabsSourceType
  tags: Array<{ tag: string }>
  link: string
  link_text: string
}

interface ILabs {
  data: {
    labsPageYaml: {
      seo: {
        title: string
        description: string
      }
      title: string
      subtitle: string
    }
    allPrismicLabEntry: {
      edges: Array<{
        node: {
          data: ILabType
        }
      }>
    }
  }
}

const Labs: React.FC<ILabs> = ({ data }) => {
  return (
    <Layout theme="dark">
      <SEO
        title={data.labsPageYaml.seo.title}
        description={data.labsPageYaml.seo.description}
      />

      <Top
        title={data.labsPageYaml.title}
        subtitle={data.labsPageYaml.subtitle}
      />

      <All content={data.allPrismicLabEntry.edges} />
    </Layout>
  )
}

export default Labs

export const query = graphql`
  query LabsQuery {
    allPrismicLabEntry(sort: { order: DESC, fields: first_publication_date }) {
      edges {
        node {
          data {
            link
            link_text
            source
            tagline
            title
            tags {
              tag
            }
            image {
              gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
            }
          }
        }
      }
    }

    labsPageYaml {
      seo {
        title
        description
      }
      title
      subtitle
    }
  }
`
