import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Projects } from '../components/Showcase'
import { CallToAction } from '../components/UI'

export interface IProject {
  node: {
    _meta: {
      uid: string
      type: string
    }
    hero_theme: string
    themes: Array<{ name: string; background: string }>
    project_title: string
    tagline: string
    services: Array<{ service: string }>
    thumb_imageSharp: {
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
    prismic: {
      allProjects: {
        edges: IProject[]
      }
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

      <Projects projects={data.prismic.allProjects.edges} />

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

    prismic {
      allProjects(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              type
            }
            hero_theme
            themes {
              name
              background
            }
            project_title
            tagline
            services {
              service
            }
            thumb_image
            thumb_imageSharp {
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
  }
`
