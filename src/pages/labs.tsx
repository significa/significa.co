import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Top, Highlights, All } from '../components/Labs'
import { LabsSourceType } from '../components/UI'

export interface ILabType {
  title: string
  tagline: string
  image: {
    alt: string
  }
  imageSharp: {
    childImageSharp: {
      fluid: FluidObject
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
    prismic: {
      allLab_entrys: {
        edges: Array<{
          node: ILabType
        }>
      }
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

      <Highlights content={data.prismic.allLab_entrys.edges} />

      <All content={data.prismic.allLab_entrys.edges} />
    </Layout>
  )
}

export default Labs

export const query = graphql`
  query LabsQuery {
    prismic {
      allLab_entrys(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            image
            imageSharp {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
            link
            link_text
            source
            tagline
            title
            tags {
              tag
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
