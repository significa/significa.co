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
    childImageSharp: {
      fluid: FluidObject
    }
  }
  more: string
  source: LabsSourceType
  tag: string
  link: string
}

interface ILabs {
  data: {
    labsPageYaml: {
      seo: {
        title: string
      }
      title: string
      subtitle: string
    }
    labsYaml: {
      tags: Array<{
        label: string
        tag: string
      }>
      content: ILabType[]
    }
  }
}

const Labs: React.FC<ILabs> = ({ data }) => {
  return (
    <Layout theme="dark">
      <SEO title={data.labsPageYaml.seo.title} />

      <Top
        title={data.labsPageYaml.title}
        subtitle={data.labsPageYaml.subtitle}
      />

      <Highlights content={data.labsYaml.content} />

      <All content={data.labsYaml.content} tags={data.labsYaml.tags} />
    </Layout>
  )
}

export default Labs

export const query = graphql`
  query LabsQuery {
    labsPageYaml {
      seo {
        title
      }
      title
      subtitle
    }
    labsYaml {
      tags {
        label
        tag
      }
      content {
        title
        tagline
        image {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        more
        source
        tag
        link
      }
    }
  }
`
