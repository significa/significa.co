import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { Top, MoreProjects } from '../components/Home/'
import FromTheBlog from '../components/FromTheBlog'
import ProjectsList from '../components/ProjectsList'
import CallToAction from '../components/CallToAction/CallToAction'

export type ServiceType = {
  title: string
  link: string
  image: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

interface HomePageProps {
  data: {
    homeYaml: {
      top: string[]
      showcase: {
        text: string
        cta: string
      }
      services: {
        title: string
        text: string
        cta: string
        design: ServiceType
        development: ServiceType
        product: ServiceType
      }
      about: {
        title: string
        text: string
        cta: string
        images: Array<{
          childImageSharp: {
            fluid: FluidObject
          }
        }>
      }
    }
  }
}

const IndexPage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <Top top={data.homeYaml.top} />
      <ProjectsList limit={2} delay={data.homeYaml.top.length * 0.1} />
      <MoreProjects
        text={data.homeYaml.showcase.text}
        cta={data.homeYaml.showcase.cta}
      />
      <FromTheBlog />
      <CallToAction />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomepageQuery {
    homeYaml {
      top

      showcase {
        text
        cta
      }

      services {
        title
        text
        cta
        design {
          title
          link
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        development {
          title
          link
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
        product {
          title
          link
          image {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
        }
      }

      about {
        title
        text
        cta
        images {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
