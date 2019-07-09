import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { IColorsTheme } from '@theme'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Projects, Highlight } from '../components/Showcase'
import { CallToAction } from '../components/UI'

interface ITheme extends IColorsTheme {
  name: string
}

export interface IProject {
  node: {
    fields: {
      slug: string
    }
    seo: {
      description: string
    }
    id: string
    title: string
    highlight?: boolean
    highlightTextColumnOn?: 'left' | 'right'
    heroTheme: string
    mainTheme: string
    navigationTheme: string
    themes?: ITheme[]
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

interface IData {
  projects: IProject[]
  featurePost?: IProject
}

const Showcase: React.FC<IShowcase> = ({ data }) => {
  const { projects, featurePost }: IData = data.allProjectsYaml.edges.reduce<
    IData
  >(
    (prev, curr: IProject) => {
      if (curr.node.highlight) {
        prev!.featurePost! = curr
      } else {
        prev.projects.push(curr)
      }
      return prev
    },
    { projects: [], featurePost: undefined }
  )

  return (
    <Layout>
      <SEO
        title={data.showcaseYaml.seo.title}
        description={data.showcaseYaml.seo.description}
      />

      {featurePost && <Highlight project={featurePost} />}

      <Projects projects={projects} />

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
          seo {
            description
          }
          id
          title
          tagline
          highlight
          highlightTextColumnOn
          heroTheme
          mainTheme
          navigationTheme
          themes {
            name
            background
            foreground
            highlight
            medium
            subtle
            error
          }
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
